import { IRefreshToken } from 'common/interfaces/auth';
import { IUserWithTokens } from 'common/interfaces/user';
import { ILogin, IRegister } from '../../../../shared/build';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { IResetPassword, ISetPassword } from 'common/interfaces/auth';

const http = new Http();

class AuthApi {
  public async loginUser(
    loginPayload: Omit<ILogin, 'id' | 'fullName' | 'avatar' | 'title' | 'skills'>,
  ): Promise<IUserWithTokens> {
    const loginResponse: IUserWithTokens = await http.load('/api/auth/login', {
      method: HttpMethod.POST,
      payload: JSON.stringify(loginPayload),
      contentType: ContentType.JSON,
    });

    return loginResponse;
  }

  public async registerUser(
    registerPayload: Omit<IRegister, 'id' | 'avatar' | 'title' | 'skills'>,
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

  public async logout(payload: IRefreshToken): Promise<void> {
    return http.load('/api/auth/logout', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { AuthApi };
