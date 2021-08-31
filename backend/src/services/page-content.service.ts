import { getCustomRepository } from 'typeorm';
import PageContentRepository from '../data/repositories/page-content.repository';
import { mapUsersToPageContributers } from '../common/mappers/user/map-users-to-page-contributors';
import { IPageContributor } from '../common/interfaces/page';

export const getEditors = async (
  pageContentId: string,
): Promise<IPageContributor[]> => {
  const pageContentRepository = getCustomRepository(PageContentRepository);
  const editors = await pageContentRepository.getEditors(pageContentId);
  return mapUsersToPageContributers(editors);
};

export const addEditor = async (
  pageContentId: string,
  userId: string,
  // io: Server,
): Promise<void> => {
  const pageContentRepository = getCustomRepository(PageContentRepository);
  await pageContentRepository.addEditor(pageContentId, userId);
  // await pageContentRepository.save({ pageContentId, userId});
};

export const deleteEditor = async (
  pageContentId: string,
  userId: string,
  // io: Server,
): Promise<void> => {
  const pageContentRepository = getCustomRepository(PageContentRepository);
  await pageContentRepository.deleteEditor(pageContentId, userId);
};
