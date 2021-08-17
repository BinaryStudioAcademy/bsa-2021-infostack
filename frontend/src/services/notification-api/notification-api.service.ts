import { http } from 'services/http/http.service';
import { INotification } from 'common/interfaces/notification';
import { ContentType, HttpMethod } from 'common/enums/enums';

class NotificationApi {
  private readonly BASE = '/api/notifications';
  private readonly _httpService = http;

  public async get(limit: number | undefined): Promise<INotification[]> {
    if (limit) {
      return this._httpService.load(`${this.BASE}?limit=${limit}`);
    }
    return this._httpService.load(this.BASE);
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

export { NotificationApi };
