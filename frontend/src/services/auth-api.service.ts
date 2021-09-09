import { HttpMethod, ContentType } from 'common/enums';
import {
  IResetPassword,
  ISetPassword,
  IUpdatePasswordAndFullName,
  IRefreshToken,
  ILogin,
  IRegister,
  IUserWithTokens,
} from 'common/interfaces';
import { http } from 'services/http.service';

class AuthApi {
  private http = http;
  private BASE = '/api/auth';

  public loginUser(loginPayload: ILogin): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/login`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(loginPayload),
      contentType: ContentType.JSON,
    });
  }

  public registerUser(registerPayload: IRegister): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/register`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(registerPayload),
      contentType: ContentType.JSON,
    });
  }

  public resetPassword(payload: IResetPassword): Promise<void> {
    return this.http.load(`${this.BASE}/reset-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public setPassword(payload: ISetPassword): Promise<void> {
    return this.http.load(`${this.BASE}/set-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public updatePasswordAndFullName(
    payload: IUpdatePasswordAndFullName,
  ): Promise<string> {
    return this.http.load(`${this.BASE}/update-password-and-fullname`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public logout(payload: IRefreshToken): Promise<void> {
    return this.http.load(`${this.BASE}/logout`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public getLoginGoogleUrl(
    requestedPage: string | null,
  ): Promise<{ url: string }> {
    return this.http.load(
      `${this.BASE}/login/google${
        requestedPage ? `?requestedPage=${requestedPage}` : ''
      }`,
    );
  }

  public getLoginGitHubUrl(
    requestedPage: string | null,
  ): Promise<{ url: string }> {
    return this.http.load(
      `${this.BASE}/login/github${
        requestedPage ? `?requestedPage=${requestedPage}` : ''
      }`,
    );
  }

  public loginGoogle(code: string): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/login/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ code }),
      contentType: ContentType.JSON,
    });
  }

  public loginGithub(code: string): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/login/github`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ code }),
      contentType: ContentType.JSON,
    });
  }
}

export const authApi = new AuthApi();
