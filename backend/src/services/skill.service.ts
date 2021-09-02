import { getCustomRepository } from 'typeorm';
import SkillRepository from '../data/repositories/skill.repository';
import { ISkill } from '../common/interfaces/skill';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ISkill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skills = await skillRepository.find({ workspaceId });

  return skills;
};

export const create = async (
  workspaceId: string,
  name: string,
): Promise<ISkill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  if (!name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.SKILL_EMPTY_NAME,
    });
  }
  const skillsInDB = await skillRepository.find({ workspaceId, name });
  if (skillsInDB.length) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.SKILL_IN_WORKSPACE_ALREADY_EXISTS,
    });
  }
  const skill = await skillRepository.save({ name, workspaceId });

  return skill;
};

export const deleteById = async (id: string): Promise<void> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const result = await skillRepository.softDelete(id);
  if (!result.affected) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.SKILL_IN_WORKSPACE_NOT_FOUND,
    });
  }
};

export const updateNameById = async (
  workspaceId: string,
  id: string,
  name: string,
): Promise<{ id: string; name: string }> => {
  const skillRepository = getCustomRepository(SkillRepository);
  if (!name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.SKILL_EMPTY_NAME,
    });
  }
  const skillsInDB = await skillRepository.find({ workspaceId, name });
  if (skillsInDB.length) {
    if (skillsInDB[0].id !== id || skillsInDB.length > 1) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.SKILL_IN_WORKSPACE_ALREADY_EXISTS,
      });
    }
  }
  const result = await skillRepository.update(id, { name });
  if (!result.affected) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.SKILL_IN_WORKSPACE_NOT_FOUND,
    });
  }
  return { id, name };
};
