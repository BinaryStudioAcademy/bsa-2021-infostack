import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import TeamRepository from '../data/repositories/team.repository';
import TeamPermissionRepository from '../data/repositories/team-permission.repository';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import PageContentRepository from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';
import { ParticipantType } from '../common/enums/participant-type';
import { IPageRequest, IPageNav, IPage } from '../common/interfaces/page';
import { IParticipant } from '../common/interfaces/participant';
import { mapPagesToPagesNav } from '../common/mappers/page/map-pages-to-pages-nav';
import { mapPageToIPage } from '../common/mappers/page/map-page-to-ipage';
import { mapPermissionstoParticipants } from '../common/mappers/page/map-permissions-to-participants';
import { Page } from '../data/entities/page';

export const createPage = async (
  userId: string,
  workspaceId: string,
  body: IPageRequest,
): Promise<IPage> => {
  const { parentPageId, ...pageContent } = body;
  const { title, content } = pageContent;

  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.save({
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
    pageId: page.id,
  });

  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );

  await userPermissionRepository.save({
    user,
    page,
    option: PermissionType.ADMIN,
  });

  return mapPageToIPage(page);
};

export const getPages = async (
  userId: string,
  workspaceId: string,
): Promise<IPageNav[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const userRepository = getCustomRepository(UserRepository);
  const teamPermissionRepository = getCustomRepository(
    TeamPermissionRepository,
  );
  const userPermissionRepository = getCustomRepository(
    UserPermissionRepository,
  );

  const userTeamsIds = await userRepository.findUserTeams(userId);
  const teamId = userTeamsIds.teams[0]?.id;

  const userTeamsPermissions = await teamPermissionRepository.findByTeamId(
    teamId,
  );

  const userPermissions = await userPermissionRepository.findByUserId(userId);

  const allPages = await pageRepository.findPages(workspaceId);

  const permittedPages: Page[] = allPages.filter(
    (page) =>
      userTeamsPermissions.some((perm) => perm.page.id === page.id) ||
      userPermissions.some((perm) => perm.page.id === page.id),
  );

  const toBeDeleted = new Set<string>();
  const finalPages = permittedPages.reduce((acc, cur, _index, array) => {
    const childPages = array.filter((page) => page.parentPageId === cur.id);
    cur.childPages = childPages;
    childPages.forEach((child) => toBeDeleted.add(child.id));
    acc.push(cur);
    return acc;
  }, []);

  const pagesToShow = finalPages.filter((page) => !toBeDeleted.has(page.id));
  return mapPagesToPagesNav(pagesToShow);
};

export const getPage = async (
  pageId: string,
): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithContents(pageId);
  return mapPageToIPage(page);
};

export const getPermissions = async (
  pageId: string,
): Promise<IParticipant[]> => {
  const userPermissionRepository = getCustomRepository(UserPermissionRepository);
  const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
  const usersPermissions = await userPermissionRepository.findByPageId(pageId);
  const teamsPermissions = await teamPermissionRepository.findByPageId(pageId);
  return mapPermissionstoParticipants(usersPermissions, teamsPermissions);
};

export const setPermission = async (
  pageId: string,
  participant: IParticipant,
): Promise<IParticipant> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithContents(pageId);
  if (participant.type === ParticipantType.USER) {
    const userPermissionRepository = getCustomRepository(UserPermissionRepository);
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(participant.id);
    const userPermission = await userPermissionRepository.findOne({ user, page });
    if (userPermission) {
      await userPermissionRepository.update(userPermission, { option: participant.role as PermissionType });
    } else {
      await userPermissionRepository.createAndSave(user, page, participant.role as PermissionType);
    }
  } else if (participant.type === ParticipantType.TEAM) {
    const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    const team = await teamRepository.findById(participant.id);
    const teamPermission = await teamPermissionRepository.findOne({ team, page });
    if (teamPermission) {
      await teamPermissionRepository.update(teamPermission, { option: participant.role as PermissionType });
    } else {
      await teamPermissionRepository.createAndSave(team, page, participant.role as PermissionType);
    }
  }
  return participant;
};

export const deletePermission = async (
  pageId: string,
  participantType: string,
  participantId: string,
): Promise<void> => {
  if (participantType === ParticipantType.USER) {
    const userPermissionRepository = getCustomRepository(UserPermissionRepository);
    const userPermission = await userPermissionRepository.findByUserAndPageId(participantId, pageId);
    await userPermissionRepository.remove(userPermission);
  } else if (participantType === ParticipantType.TEAM) {
    const teamPermissionRepository = getCustomRepository(TeamPermissionRepository);
    const teamPermission = await teamPermissionRepository.findByTeamAndPageId(participantId, pageId);
    await teamPermissionRepository.remove(teamPermission);
  }
};
