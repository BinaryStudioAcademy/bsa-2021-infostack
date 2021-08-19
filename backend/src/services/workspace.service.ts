import { getCustomRepository } from 'typeorm';
import {
  IWorkspace,
  IWorkspaceUser,
  IWorkspaceCreation,
} from '../common/interfaces/workspace';
import { mapWorkspaceToWorkspaceUsers } from '../common/mappers/workspace/map-workspace-to-workspace-users';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import UserRepository from '../data/repositories/user.repository';
import PageRepository from '../data/repositories/page.repository';
import UserPermissionRepository from '../data/repositories/user-permission.repository';
import { RoleType } from '../common/enums/role-type';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { sendMail } from '../common/utils/mailer.util';
import { InviteStatus } from '../common/enums/invite-status';
import { IRegister } from '../common/interfaces/auth';
import { DefaultUserName } from '../common/enums/default-username';
import { generateInviteToken } from '../common/utils/tokens.util';
import { env } from '../env';
import TeamRepository from '../data/repositories/team.repository';

export const inviteToWorkspace = async (
  body: IRegister,
  workspaceId: string,
): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(body.email);
  const { app } = env;

  if (!user) {
    const newUser = {
      email: body.email,
      fullName: DefaultUserName.WAITING_FOR_JOIN,
    };

    const { password, ...user } = await userRepository.save({
      ...newUser,
    });

    addUserToWorkspace(user.id, workspaceId);
    const token = generateInviteToken(user.id, workspaceId);
    const url = `${app.url}/invite?key=${token}`;

    await sendMail({
      to: user.email,
      subject:
        'You have been invited to the Infostack Workspace. Registration Link',
      text: url,
    });
  } else {
    addUserToWorkspace(user.id, workspaceId);
    const token = generateInviteToken(user.id, workspaceId);
    const url = `Hi, you have been invited to new Workspace. Please login ${app.url}/invite?key=${token}`;

    await sendMail({
      to: user.email,
      subject: 'You have been invited to the Infostack Workspace',
      text: url,
    });
  }
};
export const updateInviteStatusAccepted = async (
  userId: string,
  workspaceId: string,
): Promise<void> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspaceToUpdate =
    await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed(
      userId,
      workspaceId,
    );
  const userWorkspaceUpdated = { ...userWorkspaceToUpdate };
  userWorkspaceUpdated.status = InviteStatus.JOINED;

  await userWorkspaceRepository.save(userWorkspaceUpdated);
};

export const updateInviteStatusDeclined = async (
  userId: string,
  workspaceId: string,
): Promise<void> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspaceToUpdate =
    await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed(
      userId,
      workspaceId,
    );
  const userWorkspaceUpdated = { ...userWorkspaceToUpdate };
  userWorkspaceUpdated.status = InviteStatus.DECLINED;

  await userWorkspaceRepository.save(userWorkspaceUpdated);
};

export const deleteUserFromWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<void> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspaceToUpdate =
    await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed(
      userId,
      workspaceId,
    );
  const userWorkspaceUpdated = { ...userWorkspaceToUpdate };
  userWorkspaceUpdated.status = InviteStatus.DELETED;
  await userWorkspaceRepository.save(userWorkspaceUpdated);

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const userTeamsInWorkspace = user.teams.filter(
    (team) => team.workspaceId === workspaceId,
  );
  const userTeamsInWorkspaceIds = userTeamsInWorkspace.map((team) => team.id);
  const teamRepository = getCustomRepository(TeamRepository);
  const teams = await teamRepository.findTeamsByIds(userTeamsInWorkspaceIds);
  await Promise.all(
    teams.map(async (team) => {
      team.users = team.users.filter((user) => user.id !== userId);
      await teamRepository.save(team);
    }),
  );

  const pageRepository = getCustomRepository(PageRepository);
  const allPagesForPermissions = await pageRepository.findPages(workspaceId);
  await Promise.all(
    allPagesForPermissions.map(async (page) => {
      const userPermissionRepository = getCustomRepository(
        UserPermissionRepository,
      );
      const userPermission = await userPermissionRepository.findByUserAndPageId(
        userId,
        page.id,
      );
      if (userPermission) {
        await userPermissionRepository.remove(userPermission);
      }
    }),
  );

  const allPagesForFollowings = await pageRepository.findPages(workspaceId);
  const pageIds = allPagesForFollowings.map((page) => {
    return page.id;
  });
  await pageRepository.unfollowPages(userId, pageIds);
};

export const addUserToWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<void> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const userRepository = getCustomRepository(UserRepository);

  const workspace = await workspaceRepository.findById(workspaceId);
  const user = await userRepository.findById(userId);

  const userWorkspacePending = userWorkspaceRepository.create({
    user,
    workspace,
    role: RoleType.USER,
    status: InviteStatus.PENDING,
  });
  await userWorkspaceRepository.save(userWorkspacePending);
};

export const getWorkspaceUsers = async (
  workspaceId: string,
): Promise<IWorkspaceUser[]> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findByIdWithUsers(workspaceId);
  return mapWorkspaceToWorkspaceUsers(workspace);
};

export const getWorkspace = async (
  workspaceId: string,
  userId: string,
): Promise<IWorkspace> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspace =
    await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed(
      userId,
      workspaceId,
    );
  const { workspace } = userWorkspace;

  return { id: workspace.id, title: workspace.name, role: userWorkspace.role };
};

export const getUserWorkspaces = async (
  userId: string,
): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(
    userId,
  );
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    if (userWorkspace.status !== InviteStatus.DELETED) {
      const workspace = userWorkspace.workspace;
      workspaces.push({
        id: workspace.id,
        title: workspace.name,
        status: userWorkspace.status,
      });
    }
  }
  return workspaces;
};

export const create = async (
  userId: string,
  data: IWorkspaceCreation,
): Promise<IWorkspace> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userRepository = getCustomRepository(UserRepository);
  const isTitleUsed = await workspaceRepository.findByName(data.title);
  if (isTitleUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.WORKSPACE_ALREADY_EXISTS,
    });
  }

  const user = await userRepository.findById(userId);
  const workspace = workspaceRepository.create({ name: data.title });
  await workspaceRepository.save(workspace);
  const userWorkspace = userWorkspaceRepository.create({
    user,
    workspace,
    role: RoleType.ADMIN,
  });
  await userWorkspaceRepository.save(userWorkspace);
  return { id: workspace.id, title: workspace.name, role: userWorkspace.role };
};
