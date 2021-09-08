import { http } from './http.service';
import { API_URL } from 'common/constants';
import { HttpMethod, ContentType } from 'common/enums';
import { ILogin, IUserWithTokens } from 'common/interfaces';

class AuthService {
  private _http = http;
  private _BASE = `${API_URL}/api/auth`;

  public async loginUser(loginPayload: ILogin): Promise<IUserWithTokens> {
    return this._http.load(`${this._BASE}/login`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(loginPayload),
      contentType: ContentType.JSON,
    });
  }
}

export const authService = new AuthService();
