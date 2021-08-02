import { IUserWithTokens, IUser } from 'common/interfaces/user';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { Http } from 'services/http/http.service';

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

    localStorage.setItem('accessToken', loginResponse.accessToken);

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

    localStorage.setItem('accessToken', registerResponse.accessToken);

    return registerResponse;
  }
}

export { AuthApi };
