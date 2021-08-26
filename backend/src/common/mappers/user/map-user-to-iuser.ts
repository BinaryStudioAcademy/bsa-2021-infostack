import { User } from 'src/data/entities/user';
import { IUser } from 'src/common/interfaces/user';
import { mapPageToIPage } from '../page/map-page-to-ipage';

export const mapUserToIUser = (user: User): IUser => {
  const { id, fullName, email, avatar, title, skills, followingPages } = user;

  const mappedFollowingPages = followingPages?.map((page) =>
    mapPageToIPage(page),
  );

  return {
    id,
    fullName,
    email,
    avatar,
    title,
    skills,
    followingPages: mappedFollowingPages,
  };
};
