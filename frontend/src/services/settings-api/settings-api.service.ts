import { ITeam, ITeamCreation } from 'common/interfaces/team';
import { Http } from 'services/http/http.service';
import { ContentType, HttpMethod } from 'common/enums/enums';

class SettingsApi {
  private http = new Http();
  private BASE = '/api/settings';

  public async loadTeams(): Promise<ITeam[]> {
    return this.http.load(`${this.BASE}/teams`, {
      contentType: ContentType.JSON,
    });
  }

  public async createTeam(payload: ITeamCreation): Promise<ITeam> {
    return this.http.load(`${this.BASE}/teams`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export { SettingsApi };
