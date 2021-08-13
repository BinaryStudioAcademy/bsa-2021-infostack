import { IParticipant } from 'src/common/interfaces/participant';
import { UserPermission } from 'src/data/entities/user-permission';
import { TeamPermission } from 'src/data/entities/team-permission';
import { ParticipantType } from '../../enums/participant-type';

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
