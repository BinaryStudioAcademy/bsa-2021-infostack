import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import TeamRepository from '../data/repositories/team.repository';
import TeamPermissionRepository from '../data/repositories/team-permission.repository';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import PageContentRepository from '../data/repositories/page-content.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import TagRepository from '../data/repositories/tag.repository';
import DraftRepository from '../data/repositories/draft.repository';
import { PermissionType } from '../common/enums/permission-type';
import { ParticipantType } from '../common/enums/participant-type';
import { InviteStatus } from '../common/enums/invite-status';
import { IParticipant } from '../common/interfaces/participant';
import {
  IPageRequest,
  IPageNav,
  IPage,
  IPageContributor,
  IPageFollowed,
  IEditPageContent,
  IPageTableOfContents,
} from '../common/interfaces/page';
import { mapPagesToPagesNav } from '../common/mappers/page/map-pages-to-pages-nav';
import { mapPageToIPage } from '../common/mappers/page/map-page-to-ipage';
import { mapPermissionstoParticipants } from '../common/mappers/page/map-permissions-to-participants';
import { maximum } from '../common/helpers/permissions.helper';
import { Page } from '../data/entities/page';
import { mapPageToContributors } from '../common/mappers/page/map-page-contents-to-contributors';
import { ITag } from '../common/interfaces/tag';
import { parseHeadings } from '../common/utils/markdown.util';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const createPage = async (
  userId: string,
  workspaceId: string,
  body: IPageRequest,
): Promise<IPage> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspace =
    await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed(
      userId,
      workspaceId,
    );

  if (userWorkspace.status === InviteStatus.JOINED) {
    const { parentPageId, ...pageContent } = body;
    const { title, content } = pageContent;

    const pageRepository = getCustomRepository(PageRepository);
    const { id } = await pageRepository.save({
      authorId: userId,
      workspaceId,
      parentPageId,
      pageContents: [pageContent],
    });

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);

    const pageContentRepository = getCustomRepository(PageContentRepository);
    await pageContentRepository.save({
      title,
      content,
      authorId: userId,
      pageId: id,
    });

    const page = await pageRepository.findByIdWithContents(id);

    const userPermissionRepository = getCustomRepository(
      UserPermissionRepository,
    );
    await userPermissionRepository.createAndSave(
      user,
      page,
      PermissionType.ADMIN,
    );
    const usersPermissions = await userPermissionRepository.findByPageId(
      parentPageId,
    );
    for (const userPermission of usersPermissions) {
      await userPermissionRepository.createAndSave(
        userPermission.user,
        page,
        userPermission.option,
      );
    }

    const teamPermissionRepository = getCustomRepository(
      TeamPermissionRepository,
    );
    const teamsPermissions = await teamPermissionRepository.findByPageId(
      parentPageId,
    );
    for (const teamPermission of teamsPermissions) {
      await teamPermissionRepository.createAndSave(
        teamPermission.team,
        page,
        teamPermission.option,
      );
    }

    const workspaceAdmins = await userWorkspaceRepository.findWorkspaceAdmins(
      workspaceId,
    );

    for (const workspaceAdmin of workspaceAdmins) {
      await userPermissionRepository.createAndSave(
        workspaceAdmin.user,
        page,
        PermissionType.ADMIN,
      );
    }

    return { ...mapPageToIPage(page), permission: PermissionType.ADMIN };
  } else {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.DELETED_FROM_WORKSPACE,
    });
  }
};

export const deletePage = async (pageId: string): Promise<void> => {
  const pageRepository = getCustomRepository(PageRepository);
  await pageRepository.deleteById(pageId);
};

const addPermissionField = async <T extends { id?: string }>(
  userId: string,
  teamsIds: string[],
  page: T,
): Promise<T> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const userPermission = await userPermissionRepository.findByUserAndPageId(
    userId,
    page.id,
  );
  if (userPermission) {
    return { ...page, permission: userPermission.option };
  }
  const teamPermissions = [] as PermissionType[];
  for (const teamId of teamsIds) {
    const teamPermission = await teamPermissionRepository.findByTeamAndPageId(
      teamId,
      page.id,
    );
    if (teamPermission) {
      teamPermissions.push(teamPermission.option);
    }
  }
  if (teamPermissions.length) {
    return { ...page, permission: maximum(teamPermissions) };
  }
  return page;
};

const addPermissions = async (
  userId: string,
  teamsIds: string[],
  page: IPageNav,
): Promise<IPageNav> => {
  const pageWithPermissions = await addPermissionField<IPageNav>(
    userId,
    teamsIds,
    page,
  );
  const children = page.childPages;
  const childrenWithPermissions = [] as IPageNav[];
  for (const child of children) {
    const childWithPermissions = await addPermissions(userId, teamsIds, child);
    childrenWithPermissions.push(childWithPermissions);
  }
  return { ...pageWithPermissions, childPages: childrenWithPermissions };
};

export const getPages = async (
  userId: string,
  workspaceId: string,
): Promise<IPageNav[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);

  const { teams } = await userRepository.findUserTeams(userId);
  const teamsIds = teams.map((team) => team.id);

  const allPages = await pageRepository.findPagesWithLastContent(workspaceId);

  const toBeDeleted = new Set<string>();
  const pagesWithChildren = allPages.reduce((acc, cur, _, array) => {
    const childPages = array.filter((page) => page.parentPageId === cur.id);
    cur.childPages = childPages;
    childPages.forEach((child) => toBeDeleted.add(child.id));
    acc.push(cur);
    return acc;
  }, []);

  const pagesToShow = mapPagesToPagesNav(
    pagesWithChildren.filter((page) => !toBeDeleted.has(page.id)),
  );

  const pagesWithPermissions = [] as IPageNav[];
  for (const page of pagesToShow) {
    const pageWithPermissions = await addPermissions(userId, teamsIds, page);
    pagesWithPermissions.push(pageWithPermissions);
  }

  const finalPages = pagesWithPermissions.filter((page) => page.permission);

  return finalPages;
};

export const getPage = async (
  pageId: string,
  userId: string,
): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithContents(pageId);

  return getPageWithPermission(userId, page);
};

export const getPageVersionContent = async (
  pageId: string,
  userId: string,
  versionId: string,
): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const pageWithVersionContent =
    await pageRepository.findByIdWithVersionContent(pageId, versionId);
  const pageWithPermission = await getPageWithPermission(
    userId,
    pageWithVersionContent,
  );

  return { ...pageWithPermission, permission: PermissionType.ADMIN };
};

export const getPermissions = async (
  pageId: string,
): Promise<IParticipant[]> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const usersPermissions = await userPermissionRepository.findByPageId(pageId);
  const teamsPermissions = await teamPermissionRepository.findByPageId(pageId);
  return mapPermissionstoParticipants(usersPermissions, teamsPermissions);
};

const setUserPermission = async (
  page: Page,
  participant: IParticipant,
): Promise<void> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const userPermission = await userPermissionRepository.findByUserAndPageId(
    participant.id,
    page.id,
  );
  if (userPermission) {
    await userPermissionRepository.update(userPermission, {
      option: participant.role as PermissionType,
    });
  } else {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(participant.id);
    await userPermissionRepository.createAndSave(
      user,
      page,
      participant.role as PermissionType,
    );
  }
};

const setTeamPermission = async (
  page: Page,
  participant: IParticipant,
): Promise<void> => {
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const teamPermission = await teamPermissionRepository.findByTeamAndPageId(
    participant.id,
    page.id,
  );
  if (teamPermission) {
    await teamPermissionRepository.update(teamPermission, {
      option: participant.role as PermissionType,
    });
  } else {
    const teamRepository = getCustomRepository(TeamRepository);
    const team = await teamRepository.findById(participant.id);
    await teamPermissionRepository.createAndSave(
      team,
      page,
      participant.role as PermissionType,
    );
  }
};

const setPermissionForChildren = async (
  allPages: Page[],
  pageId: string,
  participant: IParticipant,
  set: (page: Page, participant: IParticipant) => Promise<void>,
): Promise<void> => {
  const children = allPages.filter((page) => page.parentPageId === pageId);
  for (const child of children) {
    await set(child, participant);
    await setPermissionForChildren(allPages, child.id, participant, set);
  }
};

export const setPermission = async (
  workspaceId: string,
  pageId: string,
  participant: IParticipant,
): Promise<IParticipant> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithContents(pageId);
  const allPages = await pageRepository.findPages(workspaceId);

  if (participant.type === ParticipantType.USER) {
    setUserPermission(page, participant);
    setPermissionForChildren(allPages, pageId, participant, setUserPermission);
  } else if (participant.type === ParticipantType.TEAM) {
    setTeamPermission(page, participant);
    setPermissionForChildren(allPages, pageId, participant, setTeamPermission);
  }
  return participant;
};

const deleteUserPermission = async (
  pageId: string,
  participantId: string,
): Promise<void> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const userPermission = await userPermissionRepository.findByUserAndPageId(
    participantId,
    pageId,
  );
  if (userPermission) {
    await userPermissionRepository.remove(userPermission);
  }
};

const deleteTeamPermission = async (
  pageId: string,
  participantId: string,
): Promise<void> => {
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const teamPermission = await teamPermissionRepository.findByTeamAndPageId(
    participantId,
    pageId,
  );
  await teamPermissionRepository.remove(teamPermission);
};

const deletePermissionForChildren = async (
  allPages: Page[],
  pageId: string,
  participantId: string,
  remove: (page: string, participant: string) => Promise<void>,
): Promise<void> => {
  const children = allPages.filter((page) => page.parentPageId === pageId);
  for (const child of children) {
    await remove(child.id, participantId);
    await deletePermissionForChildren(
      allPages,
      child.id,
      participantId,
      remove,
    );
  }
};

export const deletePermission = async (
  pageId: string,
  participantType: string,
  participantId: string,
  workspaceId: string,
): Promise<void> => {
  const pageRepository = getCustomRepository(PageRepository);
  const allPages = await pageRepository.findPages(workspaceId);
  if (participantType === ParticipantType.USER) {
    deleteUserPermission(pageId, participantId);
    deletePermissionForChildren(
      allPages,
      pageId,
      participantId,
      deleteUserPermission,
    );
  } else if (participantType === ParticipantType.TEAM) {
    deleteTeamPermission(pageId, participantId);
    deletePermissionForChildren(
      allPages,
      pageId,
      participantId,
      deleteTeamPermission,
    );
  }
};

export const updateContent = async (
  userId: string,
  body: IEditPageContent,
): Promise<IPage> => {
  const pageId = body.pageId;
  const pageRepository = getCustomRepository(PageRepository);
  const pageToUpdate = await pageRepository.findByIdWithLastContent(pageId);

  const contentPageId = pageToUpdate.pageContents[0].id;
  const pageContentRepository = getCustomRepository(PageContentRepository);
  const contentToUpdate = await pageContentRepository.findById(contentPageId);

  const oldContent = pageToUpdate.pageContents[0].content;
  const oldTitle = pageToUpdate.pageContents[0].title;

  contentToUpdate.content = body.content || oldContent;
  contentToUpdate.title = body.title || oldTitle;

  await pageContentRepository.save({
    title: contentToUpdate.title,
    content: contentToUpdate.content,
    authorId: userId,
    pageId: pageId,
  });

  const page = await pageRepository.findByIdWithContents(pageId);
  return getPageWithPermission(userId, page);
};

export const getContributors = async (
  pageId: string,
): Promise<IPageContributor[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithAuthorAndContent(pageId);

  return mapPageToContributors(page);
};

export const getTableOfContentsByPageId = async (
  pageId: string,
): Promise<IPageTableOfContents> => {
  const pageRepository = getCustomRepository(PageRepository);
  const { pageContents } = await pageRepository.findByIdWithLastContent(pageId);

  return { headings: parseHeadings(pageContents[0].content) };
};

export const getTableOfContentsByPageIdAndVersionId = async (
  pageId: string,
  versionId: string,
): Promise<IPageTableOfContents> => {
  const pageContentRepository = getCustomRepository(PageContentRepository);
  const { content } = await pageContentRepository.findByIdAndPageId(
    versionId,
    pageId,
  );

  return { headings: parseHeadings(content) };
};

export const getPagesFollowedByUser = async (
  userId: string,
): Promise<IPageFollowed[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const { followingPages } = await userRepository.findById(userId);
  if (followingPages.length > 0) {
    const pages = followingPages.map((page) => {
      return {
        id: page.id,
        title: page.pageContents[0].title,
      };
    });

    return pages;
  } else {
    return [];
  }
};

export const followPage = async (
  userId: string,
  pageId: string,
): Promise<void> =>
  getCustomRepository(PageRepository).followPage(userId, pageId);

export const followPages = async (
  userId: string,
  pageIds: string[],
): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const { followingPages } = await userRepository.findById(userId);
  const followedIds = followingPages.map((page) => page.id);
  const filteredIds = pageIds.filter((id) => !followedIds.includes(id));
  getCustomRepository(PageRepository).followPages(userId, filteredIds);
};

export const unfollowPage = async (
  userId: string,
  pageId: string,
): Promise<void> =>
  getCustomRepository(PageRepository).unfollowPage(userId, pageId);

export const unfollowPages = async (
  userId: string,
  pageIds: string[],
): Promise<void> =>
  getCustomRepository(PageRepository).unfollowPages(userId, pageIds);

export const getTags = async (pageId: string): Promise<ITag[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithTags(pageId);

  return page.tags;
};

export const savePageTags = async (
  pageId: string,
  body: string[],
): Promise<ITag[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findById(pageId);
  const tagRepository = getCustomRepository(TagRepository);
  const tags = await tagRepository.getTagsByIds(body);
  page.tags = tags;
  await pageRepository.save(page);

  return tags;
};

export const getPageWithPermission = async (
  userId: string,
  page: Page,
): Promise<IPage> => {
  const userRepository = getCustomRepository(UserRepository);

  const { teams } = await userRepository.findUserTeams(userId);
  const teamsIds = teams.map((team) => team.id);

  const pageWithPermission = addPermissionField(
    userId,
    teamsIds,
    mapPageToIPage(page),
  );

  return pageWithPermission;
};

export const updateDraft = async (
  pageId: string,
  userId: string,
  draftPayload: IEditPageContent,
): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const draftRepository = getCustomRepository(DraftRepository);

  const { draft } = await pageRepository.findById(pageId);
  const id = draft?.id;

  await draftRepository.save({ ...draftPayload, id });

  const pageWithUpdatedDraft = await pageRepository.findByIdWithContents(
    pageId,
  );

  return getPageWithPermission(userId, pageWithUpdatedDraft);
};

export const deleteDraft = async (pageId: string): Promise<void> => {
  const draftRepository = getCustomRepository(DraftRepository);
  await draftRepository.delete({ pageId });
};
