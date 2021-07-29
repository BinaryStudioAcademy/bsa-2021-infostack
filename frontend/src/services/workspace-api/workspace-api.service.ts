import { Http } from 'services';
import { IWorkspace, IWorkspaceCreation } from 'common/interfaces/workspace';
import { ContentType, HttpMethod } from 'common/enums/enums';

class WorkspaceApi {
  private _http: Http;

  constructor() {
    this._http = new Http;
  }

  // TODO send token

  public async create(payload: IWorkspaceCreation): Promise<IWorkspace> {
    return this._http.load('http://localhost:3000/api/workspaces', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
  public async get(): Promise<IWorkspace[]> {
    return this._http.load('http://localhost:3000/api/workspaces');
  }
}

export { WorkspaceApi };
