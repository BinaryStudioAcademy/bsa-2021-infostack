import { http } from 'services/http/http.service';
import { INotification } from 'common/interfaces/notification';

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
}

export { NotificationApi };
