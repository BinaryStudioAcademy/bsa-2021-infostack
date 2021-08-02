import { IWorkspaceUser } from 'common/interfaces/workspace';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { Http } from 'services/http/http.service';

const http = new Http();

class WorkspaceApi {
  private BASE = '/api/workspaces/';

  public async loadUsers(): Promise<IWorkspaceUser[]> {
    const response: IWorkspaceUser[] = await http.load(this.BASE + 'users', {
      method: HttpMethod.GET,
      contentType: ContentType.JSON,
    });

    return response;
  }
}

export { WorkspaceApi };
