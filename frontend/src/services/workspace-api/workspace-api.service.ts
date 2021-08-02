import { IWorkspaceUser } from 'common/interfaces/workspace';
import { ContentType } from 'common/enums/enums';
import { Http } from 'services/http/http.service';

const http = new Http();

class WorkspaceApi {
  private BASE = '/api/workspaces/';

  public async loadUsers(): Promise<IWorkspaceUser[]> {
    const response: IWorkspaceUser[] = await http.load(`${this.BASE}/users`, {
      contentType: ContentType.JSON,
    });

    return response;
  }
}

export { WorkspaceApi };
