import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import UserRepository from '../data/repositories/user.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import {
  deleteFile,
  isFileExists,
  uploadFile,
} from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import {
  IUser,
  IGetActivities,
  IGetUserActivities,
  IUserActivity,
} from '../common/interfaces/user';
import { IInviteUser } from '../common/interfaces/auth';
import { IPaginated } from '../common/interfaces/common';
import { env } from '../env';
import SkillRepository from '../data/repositories/skill.repository';
import { mapPageToIPage } from '../common/mappers/page/map-page-to-ipage';
import ActivityRepository from '../data/repositories/activity.repository';
import { mapLinkToILink } from '../common/mappers/link/map-link-to-ilink';

export const getUserById = async (
  userId: string,
  workspaceId: string,
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar, title, skills, links, followingPages } =
    await userRepository.findById(userId);
  const mappedLinks = links.map((link) => mapLinkToILink(link));
  const mappedFollowingPages = followingPages?.map((page) =>
    mapPageToIPage(page),
  );
  const userSkillsInWorkspace = skills.filter(
    (skill) => skill.workspaceId === workspaceId,
  );

  return {
    id: userId,
    fullName,
    email,
    avatar,
    title,
    skills: userSkillsInWorkspace,
    links: mappedLinks,
    followingPages: mappedFollowingPages,
  };
};

export const getInviteUserById = async (
  token: string,
): Promise<IInviteUser> => {
  const userRepository = getCustomRepository(UserRepository);

  const { app } = env;
  const decoded = jwt.verify(token, app.secretKey) as {
    userId: string;
    workspaceId: string;
  };
  const { fullName } = await userRepository.findById(decoded.userId);

  return { fullName };
};

export const getUserByIdWithWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<IUser | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar, title, skills, followingPages } =
    await userRepository.findById(userId);

  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(
    userId,
  );
  const workspaces = usersWorkspaces.map((userWorkspace) => {
    const workspace = userWorkspace.workspace;
    return {
      id: workspace.id,
      title: workspace.name,
    };
  });

  const followingPagesInCurrentWorkspace = followingPages.filter(
    (page) => page.workspaceId === workspaceId,
  );
  const newFollowingPages = followingPagesInCurrentWorkspace.map((page) =>
    mapPageToIPage(page),
  );

  const skillsInWorkspace = skills.filter(
    (skill) => skill.workspaceId === workspaceId,
  );
  let permission = false;
  workspaces.map((workspace) =>
    workspace.id === workspaceId ? (permission = true) : null,
  );
  if (permission) {
    return {
      id: userId,
      fullName,
      email,
      avatar,
      title,
      skills: skillsInWorkspace,
      followingPages: newFollowingPages,
    };
  } else {
    return {
      id: '',
      fullName: '',
      email: '',
      avatar: '',
      title: '',
      skills: [],
      followingPages: [],
    };
  }
};

export const updateUserInfo = async (
  id: string,
  workspaceId: string,
  body: { fullName: string; title: string; skills: string[] },
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const userToUpdate = await userRepository.findById(id);

  userToUpdate.fullName = body.fullName || userToUpdate.fullName;
  userToUpdate.title = body.title || null;

  const skillRepository = getCustomRepository(SkillRepository);
  const foundSkills = await skillRepository.getSkillsById(body.skills);
  const userSkillsWithoutCurrentWorkspace = userToUpdate.skills.filter(
    (skill) => skill.workspaceId !== workspaceId,
  );
  const newAllUserSkills = [
    ...userSkillsWithoutCurrentWorkspace,
    ...foundSkills,
  ];
  userToUpdate.skills = newAllUserSkills;

  const { fullName, email, avatar, title, skills, followingPages } =
    await userRepository.save(userToUpdate);

  const mappedFollowingPages = followingPages.map((page) =>
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

export const updateAvatar = async (
  id: string,
  file: Express.Multer.File,
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const userToUpdate = await userRepository.findById(id);

  if (userToUpdate.avatar) {
    const fileName = userToUpdate.avatar.split('/').pop();
    const isExistsAvatar = await isFileExists(fileName);
    if (isExistsAvatar) {
      await deleteFile(userToUpdate.avatar);
    }
  }

  const uploadedFile = await uploadFile(file);
  unlinkFile(file.path);
  const { Location } = uploadedFile;

  userToUpdate.avatar = Location || userToUpdate.avatar;

  const { fullName, email, avatar, title, skills, followingPages } =
    await userRepository.save(userToUpdate);
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

export const deleteAvatar = async (id: string): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(id);

  if (user?.avatar) {
    await deleteFile(user.avatar);

    await userRepository.updateAvatarById(user.id, '');
  }
};

export const getActivities = async (
  userId: string,
  workspaceId: string,
  data: IGetActivities,
): Promise<IPaginated<IUserActivity>> => {
  const { take, skip } = data;
  const activityRepository = new ActivityRepository();
  const activities = await activityRepository.getAll({
    take,
    skip,
    userId,
    workspaceId,
  });
  const totalItems = await activityRepository.countAll(userId, workspaceId);

  return { items: activities, totalItems };
};

export const getUserActivities = async (
  workspaceId: string,
  data: IGetUserActivities,
): Promise<IPaginated<IUserActivity>> => {
  const { take, skip, userId } = data;

  const activityRepository = new ActivityRepository();
  const activities = await activityRepository.getCreatedByUserId({
    userId,
    workspaceId,
    take,
    skip,
  });
  const totalItems = await activityRepository.countCreatedByUserId(
    userId,
    workspaceId,
  );

  return { items: activities, totalItems };
};
