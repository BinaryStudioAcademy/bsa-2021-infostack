import SkillRepository from '../data/repositories/skill.repository';
import { getCustomRepository } from 'typeorm';
import { ISkill } from 'infostack-shared';

export const getAllSkills = async (): Promise<ISkill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skills = await skillRepository.getAllSkills();

  return skills;
};

export const addNewSkill = async (name: string): Promise<ISkill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skill = await skillRepository.save({ name });

  return skill;
};
