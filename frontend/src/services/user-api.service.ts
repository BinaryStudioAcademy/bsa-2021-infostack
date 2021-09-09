import {
  IGetActivities,
  IGetUserActivities,
  IUser,
  IUserActivity,
  IUserWithTokens,
  IInviteUser,
  IPageStatistic,
  IPaginated,
} from 'common/interfaces';
import { HttpMethod, ContentType } from 'common/enums';
import { http } from 'services/http.service';

class UserApi {
  private http = http;
  private BASE = '/api/users';

  public async getCurrentUserInfo(): Promise<IUserWithTokens> {
    return await this.http.load(`${this.BASE}/me/profile`);
  }

  public async getUserInfo(id: string | undefined): Promise<IUser> {
    return await this.http.load(`${this.BASE}/${id}/profile`);
  }

  public checkIfUserRegisteredOnInvite(
    token: string | undefined,
  ): Promise<IInviteUser> {
    return this.http.load(
      `${this.BASE}/check-user-registration?token=${token}`,
    );
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
    return this.http.load(`/api/users/${id}/avatar`, {
      method: HttpMethod.DELETE,
    });
  }

  public async getActivities(
    data: IGetActivities,
  ): Promise<IPaginated<IUserActivity>> {
    const { skip, take } = data;
    return http.load(`/api/users/activities?skip=${skip}&take=${take}`);
  }

  public async getUserActivities(
    data: IGetUserActivities,
  ): Promise<IPaginated<IUserActivity>> {
    const { skip, take, userId } = data;

    return http.load(
      `/api/users/${userId}/activities?skip=${skip}&take=${take}`,
    );
  }

  public async getRecentPages(userId: string): Promise<IPageStatistic[]> {
    return this.http.load(`${this.BASE}/${userId}/recent-pages`);
  }
}

export const userApi = new UserApi();
