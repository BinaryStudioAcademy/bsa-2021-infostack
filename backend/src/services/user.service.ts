import UserRepository from '../data/repositories/user.repository';
import { getCustomRepository } from 'typeorm';
import { uploadFile } from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import { IUser } from 'infostack-shared';
import { getAll } from './workspace.service';

export const getUserById = async (id: string): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar } = await userRepository.findById(id);

  return { id, fullName, email, avatar };
};

export const getUserByIdWithWorkspace = async (userId: string, workspaceId: string): Promise<IUser | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar } = await userRepository.findById(userId);
  const workspaces = await getAll(userId);
  let permission = false;
  workspaces.map(workspace => workspace.id === workspaceId ? permission = true : null);
  if (permission) {
    return { id: userId, fullName, email, avatar };
  } else {
    return { id: '', fullName: '', email: '', avatar: '' };
  }
};

export const updateFullName = async (
  id: string,
  body: { fullName: string },
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const userToUpdate = await userRepository.findById(id);

  userToUpdate.fullName = body.fullName || userToUpdate.fullName;

  const { fullName, email, avatar } = await userRepository.save(userToUpdate);
  return { id, fullName, email, avatar };
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

  const { fullName, email, avatar } = await userRepository.save(userToUpdate);
  return { id, fullName, email, avatar };
};
