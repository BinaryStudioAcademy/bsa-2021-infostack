import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import 'datejs';
import { generatePDFUtil } from '../common/utils/generate-pdf.util';
import PageRepository from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import TeamRepository from '../data/repositories/team.repository';
import TeamPermissionRepository from '../data/repositories/team-permission.repository';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import PageContentRepository from '../data/repositories/page-content.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import TagRepository from '../data/repositories/tag.repository';
import PageShareLinkRepository from '../data/repositories/share-link.repository';
import DraftRepository from '../data/repositories/draft.repository';
import { SocketEvents } from '../common/enums/socket';
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
  IShareLink,
  IPageShare,
  IFoundPageContent,
  IExportPDF,
  IPageStatistic,
} from '../common/interfaces/page';
import { mapPagesToPagesNav } from '../common/mappers/page/map-pages-to-pages-nav';
import { mapPagesToPagesNavWithoutChildren } from '../common/mappers/page/map-pages-to-pages-nav-without-children';
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
import { decrypt, encrypt } from '../common/helpers/crypto.helper';
import { env } from '../env';
import { sendMail } from '../common/utils/mailer.util';
import elasticPageContentRepository from '../elasticsearch/repositories/page-content.repository';
import mapSearchHitElasticPageContentToFoundPageContent from '../common/mappers/page/map-search-hit-elastice-page-content-to-found-page-content';
import { RecentPagesRepository } from '../data/repositories';
import { mapToRecentPage } from '../common/mappers/page/map-recent-pages.helper';
import { RoleType } from '../common/enums/role-type';

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

    await elasticPageContentRepository.upsert({
      title,
      content,
      pageId: id,
      workspaceId,
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
  await elasticPageContentRepository.deleteByPageId(pageId);
};

const addPermissionField = async <T extends { id?: string }>(
  userId: string,
  teamsIds: string[],
  page: T,
  workspaceId: string,
): Promise<T> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspace =
    await userWorkspaceRepository.findByUserIdAndWorkspaceId(
      userId,
      workspaceId,
    );
  if (userWorkspace?.role === RoleType.ADMIN) {
    return { ...page, permission: RoleType.ADMIN };
  }

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
  workspaceId: string,
): Promise<IPageNav> => {
  const pageWithPermissions = await addPermissionField<IPageNav>(
    userId,
    teamsIds,
    page,
    workspaceId,
  );
  const children = page.childPages;
  const childrenWithPermissions = [] as IPageNav[];
  for (const child of children) {
    const childWithPermissions = await addPermissions(
      userId,
      teamsIds,
      child,
      workspaceId,
    );
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
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);

  const { role: userRole } =
    await userWorkspaceRepository.findByUserIdAndWorkspaceId(
      userId,
      workspaceId,
    );

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
    const pageWithPermissions = await addPermissions(
      userId,
      teamsIds,
      page,
      workspaceId,
    );
    pagesWithPermissions.push(pageWithPermissions);
  }

  const finalPages = pagesWithPermissions.filter((page) => page.permission);

  if (userRole === RoleType.ADMIN) {
    return pagesToShow;
  }

  return finalPages;
};

export const getPinnedPages = async (
  userId: string,
  workspaceId: string,
): Promise<IPageNav[]> => {
  const { pinnedPages } = await getCustomRepository(UserRepository).findById(
    userId,
  );
  const filteredPages = pinnedPages.filter(
    (page) => page.workspaceId === workspaceId,
  );
  const pagesToShow = mapPagesToPagesNavWithoutChildren(filteredPages);

  return pagesToShow;
};

export const getPage = async (
  pageId: string,
  userId: string,
  workspaceId: string,
): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithContents(pageId);
  if (page.workspaceId === workspaceId) {
    const pageWithPermission = await getPageWithPermission(userId, page);
    const recentPagesRepository = getCustomRepository(RecentPagesRepository);
    await recentPagesRepository.deleteOne(userId, pageId).then(() => {
      if (pageWithPermission.permission) {
        recentPagesRepository.save({ userId, pageId });
      }
    });
    return pageWithPermission;
  } else {
    return mapPageToIPage(page);
  }
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
  data: IEditPageContent,
  io: Server,
): Promise<IPage> => {
  const pageId = data.pageId;
  const pageRepository = getCustomRepository(PageRepository);
  const pageToUpdate = await pageRepository.findByIdWithLastContent(pageId);

  const contentPageId = pageToUpdate.pageContents[0].id;
  const pageContentRepository = getCustomRepository(PageContentRepository);
  const contentToUpdate = await pageContentRepository.findById(contentPageId);

  const oldContent = pageToUpdate.pageContents[0].content;
  const oldTitle = pageToUpdate.pageContents[0].title;

  contentToUpdate.content = data.content || oldContent;
  contentToUpdate.title = data.title || oldTitle;

  await pageContentRepository.save({
    title: contentToUpdate.title,
    content: contentToUpdate.content,
    authorId: userId,
    pageId: pageId,
  });

  await elasticPageContentRepository.upsert({
    title: contentToUpdate.title,
    content: contentToUpdate.content,
    pageId,
    workspaceId: pageToUpdate.workspaceId,
  });

  const page = await pageRepository.findByIdWithContents(pageId);

  io.to(pageId).emit(SocketEvents.PAGE_NEW_CONTENT, pageId);

  return getPageWithPermission(userId, page);
};

export const getContributors = async (
  pageId: string,
): Promise<IPageContributor[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithAuthorAndContent(pageId);

  if (!page) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_PAGE_WITH_SUCH_ID,
    });
  }

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
  const pageRepository = getCustomRepository(PageRepository);

  const { followingPages } = await userRepository.findById(userId);
  const followedIds = followingPages.map((page) => page.id);
  const filteredIds = pageIds.filter((id) => !followedIds.includes(id));
  await pageRepository.followPages(userId, filteredIds);
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

export const createShareLink = async (
  userId: string,
  linkData: IShareLink,
): Promise<{ link: string }> => {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const MILLISECONDS_NUM = 1000;

  const pageShareLinkRepository = getCustomRepository(PageShareLinkRepository);
  const { app } = env;

  const now = Date.now();
  let expirationDate;

  if (linkData.timeType === 'Hours') {
    expirationDate = new Date(
      now + linkData.expirationTime * SECONDS_IN_HOUR * MILLISECONDS_NUM,
    );
  } else {
    expirationDate = new Date(
      now + linkData.expirationTime * SECONDS_IN_DAY * MILLISECONDS_NUM,
    );
  }
  const link = await pageShareLinkRepository.save({
    pageId: linkData.id,
    userId,
    expireAt: expirationDate,
    name: linkData.name ? linkData.name : null,
  });
  const encryptedId = encrypt(link.id);

  const createdLink = `${app.url}/share?token=${encryptedId}`;

  return { link: createdLink };
};

export const shareLinkByEmail = async (
  body: IPageShare,
  userId: string,
): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  await sendMail({
    to: body.email,
    subject: `${user.fullName} shared an Infostack page with you`,
    text: body.link,
  });
};

export const getPageShared = async (token: string): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const pageShareLinkRepository = getCustomRepository(PageShareLinkRepository);
  if (token) {
    const id = decrypt(token);
    const link = await pageShareLinkRepository.findById(id);
    if (link) {
      const expirationTime = link.expireAt.getTime();
      if (expirationTime > Date.now()) {
        const page = await pageRepository.findByIdWithContentsShared(
          link.pageId,
        );
        const mappedPage = mapPageToIPage(page);
        return mappedPage;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getTableOfContentsShared = async (
  token: string,
): Promise<IPageTableOfContents> => {
  const pageRepository = getCustomRepository(PageRepository);
  const pageShareLinkRepository = getCustomRepository(PageShareLinkRepository);
  if (token) {
    const id = decrypt(token);
    const link = await pageShareLinkRepository.findById(id);
    if (link) {
      const expirationTime = link.expireAt.getTime();
      if (expirationTime > Date.now()) {
        const { pageContents } = await pageRepository.findByIdWithLastContent(
          link.pageId,
        );
        return { headings: parseHeadings(pageContents[0].content) };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const searchPage = async (
  query: string,
  userId: string,
  workspaceId: string,
): Promise<Partial<IFoundPageContent>[]> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );

  const {
    body: {
      hits: { hits },
    },
  } = await elasticPageContentRepository.search(query, workspaceId);
  if (!hits.length) {
    return [];
  }

  const hitPagesId = hits.map(({ _source: { pageId } }) => pageId);

  const userPermissions = await userPermissionRepository.findByUserAndPageIds(
    userId,
    hitPagesId,
  );
  const teamPermissions = await teamPermissionRepository.findByPagesAndUserId(
    hitPagesId,
    userId,
  );

  const userPermissionsPageIds = userPermissions.map(({ page: { id } }) => id);
  const teamPermissionsPageIds = teamPermissions.map(({ page: { id } }) => id);
  const haveAccessToPageIds = [
    ...new Set([...userPermissionsPageIds, ...teamPermissionsPageIds]),
  ];

  const hitsToWhichUserHaveAccess = hits.filter(({ _source: { pageId } }) =>
    haveAccessToPageIds.includes(pageId),
  );

  return mapSearchHitElasticPageContentToFoundPageContent(
    hitsToWhichUserHaveAccess,
  );
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
    page.workspaceId,
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

export const pinPage = async (userId: string, pageId: string): Promise<void> =>
  getCustomRepository(PageRepository).pinPage(userId, pageId);

export const unpinPage = async (
  userId: string,
  pageId: string,
): Promise<void> =>
  getCustomRepository(PageRepository).unpinPage(userId, pageId);

export const downloadPDF = async (pageId: string): Promise<Buffer> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithLastContent(pageId);
  const { title, content } = page.pageContents[0];
  const file = await generatePDFUtil(title, content);

  return file;
};

export const sendPDF = async (
  data: IExportPDF,
  pageId: string,
): Promise<void> => {
  const { email } = data;
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithLastContent(pageId);
  const { title, content } = page.pageContents[0];

  const file = await generatePDFUtil(title, content);

  await sendMail({
    to: email,
    subject: `${title} pdf file`,
    attachments: [
      {
        filename: `${title}.pdf`,
        content: file,
      },
    ],
  });
};

export const getRecentPages = async (
  userId: string,
  workspaceId: string,
): Promise<IPageStatistic[]> => {
  const recentPagesRepository = getCustomRepository(RecentPagesRepository);
  const recentPages = await recentPagesRepository.findAllByUserIdandWorkspaceId(
    userId,
    workspaceId,
  );

  return mapToRecentPage(recentPages);
};

const getAvailablePages = async (
  userId: string,
  workspaceId: string,
): Promise<string[]> => {
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const userRepository = getCustomRepository(UserRepository);

  const { teams } = await userRepository.findUserTeams(userId);
  const teamsIds = teams.map((team) => team.id);

  const availableForTeamsPages = teamsIds.length
    ? await teamPermissionRepository.findAvailablePages(teamsIds, workspaceId)
    : [];
  const availableForUserPages =
    await userPermissionRepository.findAvailablePages(userId, workspaceId);

  const availablePagesIds = [
    ...new Set(availableForTeamsPages.map(({ pageId }) => pageId)),
    ...new Set(availableForUserPages.map(({ pageId }) => pageId)),
  ];

  return availablePagesIds;
};

export const getMostUpdatedPages = async (
  userId: string,
  workspaceId: string,
  dateFrom: string,
  limit?: number,
): Promise<IPageStatistic[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const availablePagesIds = await getAvailablePages(userId, workspaceId);
  if (availablePagesIds.length) {
    const pages = await pageRepository.findMostUpdated(
      availablePagesIds,
      limit,
      dateFrom,
    );
    return pages;
  }
  return [];
};

export const getMostViewedPages = async (
  userId: string,
  workspaceId: string,
  dateFrom: string,
  limit?: number,
): Promise<IPageStatistic[]> => {
  const recentPagesRepository = getCustomRepository(RecentPagesRepository);
  const availablePagesIds = await getAvailablePages(userId, workspaceId);
  if (availablePagesIds.length) {
    const recentPages = await recentPagesRepository.findMostViewed(
      availablePagesIds,
      limit,
      dateFrom,
    );
    return recentPages;
  }
  return [];
};

export const getСountOfUpdates = async (
  userId: string,
  workspaceId: string,
  dateFrom: string,
): Promise<IPageStatistic[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const availablePagesIds = await getAvailablePages(userId, workspaceId);
  if (availablePagesIds.length) {
    const times = await pageRepository.findСountOfUpdates(
      availablePagesIds,
      dateFrom,
    );
    const countsOfUpdates = [];
    const date = new Date(dateFrom);
    while (date.valueOf() < new Date().setUTCHours(0, 0, 0, 0)) {
      const count = times
        .filter(
          (time) =>
            new Date(time.date) >= date &&
            new Date(time.date) <= new Date(date).addDays(1),
        )
        .map((time) => +time.count)
        .reduce((a, b) => a + b, 0);
      countsOfUpdates.push({
        count: String(count),
        date: new Date(date).toISOString(),
      });
      date.setDate(date.getDate() + 1);
    }
    return countsOfUpdates;
  }
  return [];
};
