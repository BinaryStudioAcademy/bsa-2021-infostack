import { workspaces } from '../seed-data/workspace.data';
import { Workspace } from '../entities';
import { asyncForEach } from '../../common/helpers';

class WorkspaceSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (workspace) => {
      await Object.assign(new Workspace(), { ...workspace }).save();
    }, workspaces);
  }
}

export { WorkspaceSeeder };
