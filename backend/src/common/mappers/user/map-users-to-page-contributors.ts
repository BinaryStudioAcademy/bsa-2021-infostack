import { IPageContributor } from '../../interfaces/page';
import { User } from '../../../data/entities/user';

export const mapUsersToPageContributers = (
  users: User[],
): IPageContributor[] => {
  const pageContributers = users.map(({ id, fullName, avatar }) => ({
    id,
    fullName,
    avatar,
  }));
  return pageContributers;
};
