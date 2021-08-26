import { getCustomRepository } from 'typeorm';
import { ITag } from '../common/interfaces/tag';
import TagRepository from '../data/repositories/tag.repository';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ITag[]> => {
  const tags = await getCustomRepository(TagRepository).findAllByWorkspaceId(
    workspaceId,
  );
  return tags;
};

export const create = async (
  workspaceId: string,
  name: string,
): Promise<ITag> => {
  const tagRepository = getCustomRepository(TagRepository);
  if (!name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TAG_EMPTY_NAME,
    });
  }
  const tagsInDB = await tagRepository.find({ workspaceId, name });
  if (tagsInDB.length) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TAG_IN_WORKSPACE_ALREADY_EXISTS,
    });
  }
  const tag = { name, workspaceId };
  const { id, type } = await tagRepository.save(tag);
  return { id, name, type };
};

export const deleteById = async (id: string): Promise<void> => {
  const tagRepository = getCustomRepository(TagRepository);
  const result = await tagRepository.softDelete(id);
  if (!result.affected) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.TAG_IN_WORKSPACE_NOT_FOUND,
    });
  }
};

export const updateNameById = async (
  workspaceId: string,
  id: string,
  name: string,
): Promise<{ id: string; name: string }> => {
  const tagRepository = getCustomRepository(TagRepository);
  if (!name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TAG_EMPTY_NAME,
    });
  }
  const tagsInDB = await tagRepository.find({ workspaceId, name });
  if (tagsInDB.length) {
    if (tagsInDB[0].id !== id || tagsInDB.length > 1) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.TAG_IN_WORKSPACE_ALREADY_EXISTS,
      });
    }
  }
  const result = await tagRepository.update(id, { name });
  if (!result.affected) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.TAG_IN_WORKSPACE_NOT_FOUND,
    });
  }
  return { id, name };
};
