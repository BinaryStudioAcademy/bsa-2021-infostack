import { drafts } from '../seed-data/draft.data';
import { Draft } from '../entities/draft';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class DraftSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (draft) => {
      await Object.assign(new Draft(), { ...draft }).save();
    }, drafts);
  }
}
