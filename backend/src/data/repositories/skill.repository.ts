import { EntityRepository, Repository, In } from 'typeorm';
import { Skill } from '../entities/skill';

@EntityRepository(Skill)
class SkillRepository extends Repository<Skill> {
  public getAllSkills(): Promise<Skill[]> {
    return this.find();
  }

  public getSkillsById(ids: string[]): Promise<Skill[]> {
    return this.find({ where: { id: In(ids) } });
  }
}

export default SkillRepository;
