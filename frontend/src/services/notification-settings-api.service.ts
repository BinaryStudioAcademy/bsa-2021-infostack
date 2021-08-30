import { http } from 'services';
import { ContentType, NotificationType, HttpMethod } from 'common/enums';

class NotificationSettingsApi {
  private readonly BASE = '/api/notifications-settings';
  private readonly _httpService = http;

  public async getNotificationsSettings(): Promise<string[]> {
    return this._httpService.load(this.BASE);
  }

  public async createNotificationSettings(
    notificationType: NotificationType,
  ): Promise<string> {
    return this._httpService.load(this.BASE, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ notificationType }),
    });
  }

  public async deleteNotificationSettings(
    notificationType: NotificationType,
  ): Promise<string> {
    return this._httpService.load(this.BASE, {
      method: HttpMethod.DELETE,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ notificationType }),
    });
  }
}

export const notificationSettingsApi = new NotificationSettingsApi();
