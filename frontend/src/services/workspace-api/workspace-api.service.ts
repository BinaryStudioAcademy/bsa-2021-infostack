import {
  IWorkspace,
  IWorkspaceCreation,
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
}

export { WorkspaceApi };
