import { IUser, IUserWithTokens } from 'common/interfaces/user';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { http } from 'services/http/http.service';

class UserApi {
  private http = http;
  private BASE = '/api/users';

  public async getCurrentUserInfo(): Promise<IUserWithTokens> {
    return await this.http.load(`${this.BASE}/me/profile`);
  }

  public async getUserInfo(id: string | undefined): Promise<IUserWithTokens> {
    return await this.http.load(`${this.BASE}/${id}/profile`);
  }

  public async update(
    id: string,
    updatePayload: Partial<IUser>,
  ): Promise<IUser> {
    const updateResponse: IUser = await this.http.load(
      `${this.BASE}/${id}/profile`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(updatePayload),
        contentType: ContentType.JSON,
      },
    );

    return updateResponse;
  }

  public async uploadAvatar(
    id: string,
    file: File,
    fileName: string,
  ): Promise<IUser> {
    const fd = new FormData();
    fd.append('image', file, fileName);

    const uploadResponse: IUser = await this.http.load(
      `/api/users/${id}/avatar`,
      {
        method: HttpMethod.PUT,
        payload: fd,
      },
    );

    return uploadResponse;
  }

  public async deleteAvatar(id: string): Promise<void> {
    return http.load(`/api/users/${id}/avatar`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { UserApi };
