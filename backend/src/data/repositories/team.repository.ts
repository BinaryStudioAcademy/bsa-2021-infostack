import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {
  public findById(id: string):Promise<Team> {
    return this.findOne({ id });
  }
}

export default TeamRepository;
