import { http } from 'services/http.service';
import { IWorkspace } from 'common/interfaces';

class WorkspaceService {
  private _http = http;
  private _BASE = 'http://10.0.2.2:3001/api/workspaces';

  public async getWorkspaces(): Promise<IWorkspace[]> {
    return this._http.load(this._BASE);
  }
}

export const workspaceService = new WorkspaceService();
