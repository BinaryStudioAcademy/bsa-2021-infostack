import { drafts } from '../seed-data/draft.data';
import { Draft } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class DraftSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (draft) => {
      await Object.assign(new Draft(), { ...draft }).save();
    }, drafts);
  }
}
