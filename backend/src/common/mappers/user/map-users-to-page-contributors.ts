import { IPageContributor } from '../../interfaces';
import { User } from '../../../data/entities';

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
