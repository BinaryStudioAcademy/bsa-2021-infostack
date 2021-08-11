import {
  IWorkspaceUser,
  IWorkspace,
  IWorkspaceCreation,
  IWorkspaceUserRole,
  IWorkspaceInvite,
} from 'common/interfaces/workspace';
import { ContentType, HttpMethod } from 'common/enums/enums';
import { http } from 'services/http/http.service';

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

  public async get(): Promise<IWorkspace[]> {
    return this.http.load(this.BASE);
  }

  public async getById(id: string): Promise<IWorkspace> {
    return this.http.load(`${this.BASE}/${id}`);
  }

  public async loadUsers(id: string): Promise<IWorkspaceUser[]> {
    return this.http.load(`${this.BASE}/${id}/users`, {
      contentType: ContentType.JSON,
    });
  }

  public async getUserRole(
    workspaceId: string,
    userId: string,
  ): Promise<IWorkspaceUserRole> {
    return this.http.load(`${this.BASE}/${workspaceId}/user/${userId}/role`, {
      contentType: ContentType.JSON,
    });
  }

  public async inviteToWorkspace(payload: IWorkspaceInvite): Promise<IWorkspace> {
    return this.http.load(`${this.BASE}/invite`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async updateInviteStatusAccepted(
    id: string,
  ): Promise<IWorkspace> {
    const updateResponse: IWorkspace = await this.http.load(`${this.BASE}/${id}/accept-invite-status`, {
      method: HttpMethod.PUT,
    });

    return updateResponse;
  }

  public async updateInviteStatusDeclined(
    id: string,
  ): Promise<IWorkspace> {
    const updateResponse: IWorkspace = await this.http.load(`${this.BASE}/${id}/decline-invite-status`, {
      method: HttpMethod.PUT,
    });

    return updateResponse;
  }
}
export { WorkspaceApi };
