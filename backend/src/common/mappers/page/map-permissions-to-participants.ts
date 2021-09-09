import { IParticipant } from '~/common/interfaces';
import { UserPermission, TeamPermission } from 'src/data/entities';
import { ParticipantType } from '../../enums';

export const mapPermissionstoParticipants = (
  usersPermissions: UserPermission[],
  teamsPermissions: TeamPermission[],
): IParticipant[] => {
  const mappedUsers = usersPermissions.map(({ user, option }) => ({
    name: user.fullName,
    id: user.id,
    type: ParticipantType.USER,
    role: option,
  }));
  const mappedTeams = teamsPermissions.map(({ team, option }) => ({
    name: team.name,
    id: team.id,
    type: ParticipantType.TEAM,
    role: option,
  }));
  return [...mappedUsers, ...mappedTeams];
};
