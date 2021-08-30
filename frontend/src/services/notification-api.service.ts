import { http } from 'services/http.service';
import { INotification } from 'common/interfaces/notification';
import { ContentType, HttpMethod } from 'common/enums';
import { getStringifiedQuery } from 'helpers/helpers';
import { IQuery } from 'common/interfaces/query';

class NotificationApi {
  private readonly BASE = '/api/notifications';
  private readonly _httpService = http;

  public async get(query?: IQuery): Promise<INotification[]> {
    return this._httpService.load(
      `${this.BASE}${query ? `?${getStringifiedQuery(query)}` : ''}`,
    );
  }

  public async getCount(): Promise<{ count: number }> {
    return this._httpService.load(`${this.BASE}/count`);
  }

  public async read(id: string): Promise<INotification> {
    return this._httpService.load(`${this.BASE}/${id}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ read: true }),
    });
  }

  public async readAll(): Promise<INotification[]> {
    return this._httpService.load(this.BASE, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ read: true }),
    });
  }
}

export const notificationApi = new NotificationApi();
