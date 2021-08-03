import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';

@EntityRepository(Team)
class TeamRepository extends Repository<Team> {
  findById(id: string):Promise<Team> {
    return this.findOne({ id });
  }

  async findUserTeam(userId: string):Promise<Team[]> {
    return await this.createQueryBuilder('team')
      .leftJoinAndSelect('user.teams', 'teams')
      .where('teams.userId = :userId', { userId } )
      .getMany();
  }

  // async findUserTeam(userId: string):Promise<Team[]> {
  //   const teams = await this.createQueryBuilder('team')
  //     .leftJoinAndSelect('teams.users', 'teams')
  //     .where('users.userId = :userId', { userId } )
  //     .getMany();

  //   return this.createQueryBuilder('teams')
  //     .leftJoinAndSelect('users.users', 'users')
  //     .where('users.userId = :userId', { userId } )
  //     .getMany();
  // }

  findUserTeamsPermissions(teamId: string):Promise<Team[]> {

    const userTeamsPermissions = this.createQueryBuilder('teamPermissions')
      .leftJoinAndSelect('teamPermissions', 'team_member')
      .where('teamPermissions.teamId = :teamId', { teamId } )
      .getMany();
    return userTeamsPermissions;
  }
}

export default TeamRepository;
