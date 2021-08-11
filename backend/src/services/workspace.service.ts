import { getCustomRepository } from 'typeorm';
import { IWorkspaceUser } from '../common/interfaces/workspace/workspace-user';
import { IWorkspace } from '../common/interfaces/workspace/workspace';
import { IWorkspaceCreation } from '../common/interfaces/workspace/workspace-creation';
import { mapWorkspaceToWorkspaceUsers } from '../common/mappers/workspace/map-workspace-to-workspace-users';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import UserRepository from '../data/repositories/user.repository';
import { RoleType } from '../common/enums/role-type';
import { IWorkspaceUserRole } from '../common/interfaces/workspace/workspace-user-role';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { sendMail } from '../common/utils/mailer.util';
import { InviteStatus, IRegister, DefaultUserName, DefaultPassword } from 'infostack-shared';
import { generateInviteToken } from '../common/utils/tokens.util';
import { env } from '../env';
import { hash } from '../common/utils/hash.util';

export const inviteToWorkspace = async (body: IRegister, workspaceId: string): Promise<void> => {

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(body.email);
  const { app } = env;

  if (!user) {
    body.password = DefaultPassword.PASSWORD;
    body.fullName = DefaultUserName.WAITING_FOR_JOIN;
    const hashedPassword = await hash(body.password);
    const { password, ...user } = await userRepository.save({
      ...body,
      password: hashedPassword,
    });

    addUserToWorkspace(user.id, workspaceId);
    const token = generateInviteToken(user.id, workspaceId);
    const url = `${app.url}/invite?key=${token}`;

    await sendMail({ to: user.email, subject: 'You have been invited to the Infostack Workspace. Registration Link', text: url });
  } else {
    addUserToWorkspace(user.id, workspaceId);
    const token = generateInviteToken(user.id, workspaceId);
    const url = `Hi, you have been invited to new Workspace. Please login ${app.url}/invite?key=${token}`;

    await sendMail({ to: user.email, subject: 'You have been invited to the Infostack Workspace', text: url });
  }
};
export const updateInviteStatusAccepted = async (userId: string, workspaceId: string): Promise<void> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspaceToUpdate = await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed( userId, workspaceId );
  const userWorkspaceUpdated = { ...userWorkspaceToUpdate };
  userWorkspaceUpdated.status = InviteStatus.JOINED;

  await userWorkspaceRepository.save(userWorkspaceUpdated);
};

export const updateInviteStatusDeclined = async (userId: string, workspaceId: string): Promise<void> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspaceToUpdate = await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed( userId, workspaceId );
  const userWorkspaceUpdated = { ...userWorkspaceToUpdate };
  userWorkspaceUpdated.status = InviteStatus.DECLINED;

  await userWorkspaceRepository.save(userWorkspaceUpdated);
};
export const addUserToWorkspace = async (userId: string, workspaceId: string): Promise<void> => {
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

export const getWorkspaceUserRole = async (
  userId: string,
  workspaceId: string,
): Promise<IWorkspaceUserRole> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspace =
    await userWorkspaceRepository.findByUserIdAndWorkspaceId(
      userId,
      workspaceId,
    );

  return { role: userWorkspace.role };
};

export const getOne = async (workspaceId: string, userId: string): Promise<IWorkspace> => {
  const userWorkspace = await getCustomRepository(UserWorkspaceRepository)
    .findByUserIdAndWorkspaceIdDetailed(userId, workspaceId);

  const workspace = userWorkspace.workspace;
  return { id: workspace.id, title: workspace.name };
};

export const getUserWorkspaces = async (userId: string): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(
    userId,
  );
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    const workspace = userWorkspace.workspace;
    workspaces.push({ id: workspace.id, title: workspace.name, status: userWorkspace.status });
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
  return { id: workspace.id, title: workspace.name };
};
