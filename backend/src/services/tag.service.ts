import { getCustomRepository } from 'typeorm';
import { ITag, ITagCreation } from 'infostack-shared/common/interfaces';
import TagRepository from '../data/repositories/tag.repository';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ITag[]> => {
  const tagRepository = getCustomRepository(TagRepository);
  return await tagRepository.findAllByWorkspaceId(workspaceId);
};

export const create = async (newTag: ITagCreation): Promise<ITag> => {
  const tagRepository = getCustomRepository(TagRepository);
  if (!newTag.name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TAG_EMPTY_STRING,
    });
  }
  const tagsInDB = await tagRepository.find(newTag);
  if (tagsInDB.length) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TAG_IN_WORKSPACE_ALREADY_EXISTS,
    });
  }
  const { id, workspaceId, name } = await tagRepository.save(newTag);
  return { id, workspaceId, name };
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
  id: string,
  name: string,
): Promise<{ id: string; name: string }> => {
  const tagRepository = getCustomRepository(TagRepository);
  if (!name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TAG_EMPTY_STRING,
    });
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
