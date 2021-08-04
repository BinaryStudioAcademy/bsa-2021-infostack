import { IRefrashToken } from './../../../../shared/build/common/interfaces/auth/refresh-tokens.interface.d';
import { IUserWithTokens, IUser } from 'common/interfaces/user';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IResetPassword, ISetPassword } from 'common/interfaces/auth';

const http = new Http();

class AuthApi {
  public async loginUser(
    loginPayload: Omit<IUser, 'id' | 'fullName' | 'avatar'>,
  ): Promise<IUserWithTokens> {
    const loginResponse: IUserWithTokens = await http.load('/api/auth/login', {
      method: HttpMethod.POST,
      payload: JSON.stringify(loginPayload),
      contentType: ContentType.JSON,
    });

    return loginResponse;
  }

  public async registerUser(
    registerPayload: Omit<IUser, 'id' | 'avatar'>,
  ): Promise<IUserWithTokens> {
    const registerResponse: IUserWithTokens = await http.load(
      '/api/auth/register',
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(registerPayload),
        contentType: ContentType.JSON,
      },
    );

    return registerResponse;
  }

  public async resetPassword(payload: IResetPassword): Promise<void> {
    return http.load('/api/auth/reset-password', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async setPassword(payload: ISetPassword): Promise<void> {
    return http.load('/api/auth/set-password', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async logout(payload: IRefrashToken): Promise<void> {
    return http.load('/api/auth/logout', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { AuthApi };
