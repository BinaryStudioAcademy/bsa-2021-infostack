import {
  IWorkspace,
  IWorkspaceCreation,
  IWorkspaceInvite,
  IWorkspaceUser,
} from 'common/interfaces/workspace';
import { ContentType, HttpMethod } from 'common/enums/enums';
import { http } from 'services/http.service';

class WorkspaceApi {
  private http = http;
  private BASE = '/api/workspaces';

  public async create(payload: IWorkspaceCreation): Promise<IWorkspace> {
    return this.http.load(this.BASE, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getWorkspaces(): Promise<IWorkspace[]> {
    return this.http.load(this.BASE);
  }

  public async getWorkspace(id: string): Promise<IWorkspace> {
    return this.http.load(`${this.BASE}/${id}`);
  }

  public async getUsers(): Promise<IWorkspaceUser[]> {
    return this.http.load(`${this.BASE}/current/users`, {
      contentType: ContentType.JSON,
    });
  }

  public async inviteToWorkspace(
    payload: IWorkspaceInvite,
  ): Promise<IWorkspace> {
    return this.http.load(`${this.BASE}/invite`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async updateInviteStatusAccepted(id: string): Promise<IWorkspace> {
    const updateResponse: IWorkspace = await this.http.load(
      `${this.BASE}/${id}/accept-invite-status`,
      {
        method: HttpMethod.PUT,
      },
    );

    return updateResponse;
  }

  public async updateInviteStatusDeclined(id: string): Promise<IWorkspace> {
    const updateResponse: IWorkspace = await this.http.load(
      `${this.BASE}/${id}/decline-invite-status`,
      {
        method: HttpMethod.PUT,
      },
    );

    return updateResponse;
  }

  public async deleteUserFromWorkspace(id: string): Promise<IWorkspace> {
    const updateResponse: IWorkspace = await this.http.load(
      `${this.BASE}/users/${id}`,
      {
        method: HttpMethod.DELETE,
      },
    );

    return updateResponse;
  }
}
export const workspaceApi = new WorkspaceApi();
