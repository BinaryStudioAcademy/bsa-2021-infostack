import { IUserWithTokens } from 'common/interfaces';
import { HttpMethod, ContentType } from 'common/enums';
import { ILogin } from 'common/interfaces';
import { http } from 'services/http.service';

class AuthService {
  private _http = http;
  private _BASE = 'http://10.0.2.2:3001/api/auth';

  public async loginUser(loginPayload: ILogin): Promise<IUserWithTokens> {
    return this._http.load(`${this._BASE}/login`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(loginPayload),
      contentType: ContentType.JSON,
    });
  }
}

export const authService = new AuthService();