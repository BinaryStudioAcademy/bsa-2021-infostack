import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/user.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import {
  deleteFile,
  isFileExists,
  uploadFile,
} from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import { IUser } from 'infostack-shared';
import { env } from '../env';
import jwt from 'jsonwebtoken';
import SkillRepository from '../data/repositories/skill.repository';
import { mapPageToIPage } from '../common/mappers/page/map-page-to-ipage';

export const getUserById = async (id: string): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar, title, skills } =
    await userRepository.findById(id);

  return { id, fullName, email, avatar, title, skills };
};

export const getInviteUserById = async (token: string): Promise<string> => {
  const userRepository = getCustomRepository(UserRepository);

  const { app } = env;
  const decoded = jwt.verify(token, app.secretKey) as {
    userId: string;
    workspaceId: string;
  };
  const { fullName } = await userRepository.findById(decoded.userId);

  return JSON.stringify(fullName);
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
  const newFollowingPages = followingPages.map((page) => mapPageToIPage(page));
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
      skills,
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
  body: { fullName: string; title: string; skills: string[] },
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const userToUpdate = await userRepository.findById(id);

  userToUpdate.fullName = body.fullName || userToUpdate.fullName;
  userToUpdate.title = body.title || userToUpdate.title;

  const skillRepository = getCustomRepository(SkillRepository);
  const foundSkills = await skillRepository.getSkillsById(body.skills);
  userToUpdate.skills = foundSkills;

  const { fullName, email, avatar, title, skills } = await userRepository.save(
    userToUpdate,
  );

  return { id, fullName, email, avatar, title, skills };
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

  const { fullName, email, avatar, title, skills } = await userRepository.save(
    userToUpdate,
  );

  return { id, fullName, email, avatar, title, skills };
};

export const deleteAvatar = async (id: string): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(id);

  if (user?.avatar) {
    await deleteFile(user.avatar);

    await userRepository.updateAvatarById(user.id, '');
  }
};
