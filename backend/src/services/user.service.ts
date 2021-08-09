import UserRepository from '../data/repositories/user.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import { getCustomRepository } from 'typeorm';
import {
  deleteFile,
  uploadFile,
} from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import { IUser } from 'infostack-shared';
import SkillRepository from '../data/repositories/skill.repository';

export const getUserById = async (id: string): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar, title, skills } = await userRepository.findById(id);

  return { id, fullName, email, avatar, title, skills };
};

export const getUserByIdWithWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<IUser | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar } = await userRepository.findById(userId);

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

  let permission = false;
  workspaces.map((workspace) =>
    workspace.id === workspaceId ? (permission = true) : null,
  );
  if (permission) {
    return { id: userId, fullName, email, avatar };
  } else {
    return { id: '', fullName: '', email: '', avatar: '' };
  }
};

export const updateUserInfo = async (
  id: string,
  body: { fullName: string, title: string, skills: string[] },
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const userToUpdate = await userRepository.findById(id);

  userToUpdate.fullName = body.fullName || userToUpdate.fullName;
  userToUpdate.title = body.title || userToUpdate.title;

  const skillRepository = getCustomRepository(SkillRepository);
  const foundSkills = await skillRepository.getSkillsById(body.skills);
  userToUpdate.skills = foundSkills;

  const { fullName, email, avatar, title, skills } = await userRepository.save(userToUpdate);

  return { id, fullName, email, avatar, title, skills };
};

export const updateAvatar = async (
  id: string,
  file: Express.Multer.File,
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const uploadedFile = await uploadFile(file);
  unlinkFile(file.path);
  const { Location } = uploadedFile;
  const userToUpdate = await userRepository.findById(id);

  userToUpdate.avatar = Location || userToUpdate.avatar;

  const { fullName, email, avatar, title, skills } = await userRepository.save(userToUpdate);

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
