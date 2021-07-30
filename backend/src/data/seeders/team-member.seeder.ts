import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user.repository';
import TeamRepository from '../repositories/team.repository';
import { teamMembers } from '../seed-data/team-member.data';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class TeamMemberSeeder {
  public static async execute(): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const teamRepository = getCustomRepository(TeamRepository);
    await asyncForEach(async teamMember => {
      const user = await userRepository.findById(teamMember.userId);
      const team = await teamRepository.findById(teamMember.teamId);
      team.users = [];
      user.teams = [];
      team.users.push(user);
      user.teams.push(team);
      await userRepository.save(user);
      await teamRepository.save(team);
    }, teamMembers);
  }
}
