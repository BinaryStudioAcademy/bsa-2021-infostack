import {
  IWorkspaceUser,
  IWorkspace,
  IWorkspaceCreation,
} from 'common/interfaces/workspace';
import { ContentType, HttpMethod } from 'common/enums/enums';
import { Http } from 'services/http/http.service';

class WorkspaceApi {
  private http = new Http();
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

  public async loadUsers(id: string): Promise<IWorkspaceUser[]> {
    return this.http.load(`${this.BASE}/${id}/users`, {
      contentType: ContentType.JSON,
    });
  }
}

export { WorkspaceApi };
