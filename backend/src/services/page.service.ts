import { getCustomRepository } from 'typeorm';
import PageRepository from '../data/repositories/page.repository';
import UserRepository from '../data/repositories/user.repository';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import PageContentRepository from '../data/repositories/page-content.repository';
import { PermissionType } from '../common/enums/permission-type';
import TeamPermissionRepository from '../data/repositories/team-permission.repository';
import {
  IPageRequest,
  IPageNav,
  IPage,
  IPageContributor,
  IEditPageContent,
  IPageTableOfContents,
} from '../common/interfaces/page';
import { mapPagesToPagesNav } from '../common/mappers/page/map-pages-to-pages-nav';
import { mapPageToIPage } from '../common/mappers/page/map-page-to-ipage';
import { Page } from '../data/entities/page';
import { mapPageToContributors } from '../common/mappers/page/map-page-contents-to-contributors';
import { parseHeadings } from '../common/utils/markdown.util';

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

  const userPermissions = await userPermissionRepository.findById(userId);

  const allPages = await pageRepository.findPagesWithLastContent(workspaceId);

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

export const getPage = async (pageId: string): Promise<IPage> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithLastContent(pageId);
  return mapPageToIPage(page);
};

export const updateContent = async (body: IEditPageContent): Promise<IPage> => {
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
    authorId: contentToUpdate.authorId,
    pageId: pageId,
  });

  const page = await pageRepository.findByIdWithLastContent(pageId);
  return mapPageToIPage(page);
};

export const getContributors = async (
  pageId: string,
): Promise<IPageContributor[]> => {
  const pageRepository = getCustomRepository(PageRepository);
  const page = await pageRepository.findByIdWithAuthorAndContent(pageId);

  return mapPageToContributors(page);
};

export const getTableOfContents = async (
  pageId: string,
): Promise<IPageTableOfContents> => {
  const pageRepository = getCustomRepository(PageRepository);
  const { pageContents } = await pageRepository.findByIdWithLastContent(pageId);

  return { headings: parseHeadings(pageContents[0].content) };
};
