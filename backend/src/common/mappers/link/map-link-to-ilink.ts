import { PageShareLink } from '~/data/entities';
import { ILink } from '~/common/interfaces';

export const mapLinkToILink = (link: PageShareLink): ILink => {
  const { id, pageId, userId, createdAt, expireAt, name } = link;

  const newCreatedAt = createdAt?.toISOString();
  const newExpireAt = expireAt?.toISOString();
  return {
    id,
    pageId,
    userId,
    createdAt: newCreatedAt,
    expireAt: newExpireAt,
    name: name,
  };
};
