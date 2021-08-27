import { getCustomRepository } from 'typeorm';
import { IShareLink } from '../common/interfaces/page';
import PageShareLinkRepository from '../data/repositories/share-link.repository';
import { mapLinkToILink } from '../common/mappers/link/map-link-to-ilink';
import { ILinkShareable } from '../common/interfaces/link';
import { env } from '../env';
import { encrypt } from '../common/helpers/crypto.helper';

export const extendExpirationDate = async (
  id: string,
  linkData: IShareLink,
): Promise<void> => {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const MILLISECONDS_NUM = 1000;
  const pageShareLinkRepository = getCustomRepository(PageShareLinkRepository);
  const link = await pageShareLinkRepository.findById(id);
  const expirationTime = link.expireAt.getTime();
  let newExpirationDate;
  if (linkData.timeType === 'Hours') {
    newExpirationDate = new Date(
      expirationTime +
        linkData.expirationTime * SECONDS_IN_HOUR * MILLISECONDS_NUM,
    );
  } else {
    newExpirationDate = new Date(
      expirationTime +
        linkData.expirationTime * SECONDS_IN_DAY * MILLISECONDS_NUM,
    );
  }
  link.expireAt = newExpirationDate;
  await pageShareLinkRepository.save(link);
};

export const deactivateLinkById = async (id: string): Promise<void> => {
  const pageShareLinkRepository = getCustomRepository(PageShareLinkRepository);
  const link = await pageShareLinkRepository.findById(id);
  const now = Date.now();
  link.expireAt = new Date(now);
  await pageShareLinkRepository.save(link);
};

export const getAllLinksByUserAndPage = async (
  userId: string,
  pageId: string,
): Promise<ILinkShareable[]> => {
  const pageShareLinkRepository = getCustomRepository(PageShareLinkRepository);
  const { app } = env;
  const links = await pageShareLinkRepository.findAllByPageAndUser(
    userId,
    pageId,
  );
  const filteredLinks = links.filter(
    (link) => new Date(link.expireAt).getTime() > Date.now(),
  );
  const mappedLinks = filteredLinks.map((link) => mapLinkToILink(link));
  const linksShareable = mappedLinks.map((link) => {
    const encryptedId = encrypt(link.id);
    return {
      ...link,
      link: `${app.url}/share?token=${encryptedId}`,
    };
  });
  return linksShareable;
};
