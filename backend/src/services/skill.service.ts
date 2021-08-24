import { getCustomRepository } from 'typeorm';
import SkillRepository from '../data/repositories/skill.repository';
import { ISkill } from '../common/interfaces/skill';

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
  const skill = await skillRepository.save({ name, workspaceId });

  return skill;
};
