import { notifications } from '../seed-data/notification.data';
import { Notification } from '../entities/notification';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class NotificationSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (notification) => {
      await Object.assign(new Notification(), { ...notification }).save();
    }, notifications);
  }
}
