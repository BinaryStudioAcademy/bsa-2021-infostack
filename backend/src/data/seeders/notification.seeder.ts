import { notifications } from '../seed-data/notification.data';
import { Notification } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class NotificationSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (notification) => {
      await Object.assign(new Notification(), { ...notification }).save();
    }, notifications);
  }
}
