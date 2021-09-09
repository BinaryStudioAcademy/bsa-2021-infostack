import { getCustomRepository } from 'typeorm';

import { userWorkspaces } from '../seed-data/user-workspace.data';
import { UserWorkspace } from '../entities';
import { asyncForEach } from '../../common/helpers';
import { UserRepository, WorkspaceRepository } from '../repositories';
import { RoleType } from '../../common/enums';

export class UserWorkspaceSeeder {
  public static async execute(): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const workspaceRepository = getCustomRepository(WorkspaceRepository);
    await asyncForEach(async (userWorkspace) => {
      const user_workspace = new UserWorkspace();
      user_workspace.user = await userRepository.findById(userWorkspace.userId);
      user_workspace.workspace = await workspaceRepository.findById(
        userWorkspace.workspaceId,
      );
      let role;
      Object.values(RoleType).forEach((roleEnum) =>
        userWorkspace.role === roleEnum ? (role = roleEnum) : null,
      );
      user_workspace.role = role;
      await UserWorkspace.save(user_workspace);
    }, userWorkspaces);
  }
}
