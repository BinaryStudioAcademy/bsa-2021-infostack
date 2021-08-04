import UserRepository from '../data/repositories/user.repository';
import { getCustomRepository } from 'typeorm';
import { uploadFile } from '../common/helpers/s3-file-storage.helper';
import { unlinkFile } from '../common/helpers/multer.helper';
import { IUser } from 'infostack-shared';

export const getUserById = async (id: string): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, avatar, title } = await userRepository.findById(id);

  return { id, fullName, email, avatar, title };
};

export const updateUserInfo = async (
  id: string,
  body: { fullName: string, title: string },
): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const userToUpdate = await userRepository.findById(id);

  userToUpdate.fullName = body.fullName || userToUpdate.fullName;
  userToUpdate.title = body.title || userToUpdate.title;

  const { fullName, email, avatar, title } = await userRepository.save(userToUpdate);
  return { id, fullName, email, avatar, title };
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

  const { fullName, email, avatar, title } = await userRepository.save(userToUpdate);
  return { id, fullName, email, avatar, title };
};
