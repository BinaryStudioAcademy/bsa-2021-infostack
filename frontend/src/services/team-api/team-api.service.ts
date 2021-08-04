import { ITeam } from 'common/interfaces/team';
import { Http } from 'services/http/http.service';

class TeamApi {
  private http = new Http();
  private BASE = '/api/workspace/settings/teams';

  public async get(): Promise<ITeam[]> {
    return this.http.load(this.BASE);
  }
}

export { TeamApi };
