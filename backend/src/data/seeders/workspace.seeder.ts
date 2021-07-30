import { workspaces } from '../seed-data/workspace.data';
import { Workspace } from '../entities/workspace';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class WorkspaceSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async workspace => {
      await Object.assign(new Workspace(), { ...workspace }).save();
    }, workspaces);
  }
}
