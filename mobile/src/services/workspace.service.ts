import { http } from './http.service';
import { IWorkspace } from 'common/interfaces';
import { API_URL } from 'common/constants';

class WorkspaceService {
  private _http = http;
  private _BASE = `${API_URL}/api/workspaces`;

  public async getWorkspaces(): Promise<IWorkspace[]> {
    return this._http.load(this._BASE);
  }
}

export const workspaceService = new WorkspaceService();
