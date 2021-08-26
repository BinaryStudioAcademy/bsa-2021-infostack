import { PageShareLink } from 'src/data/entities/page-share-link';
import { ILink } from 'src/common/interfaces/link';

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
