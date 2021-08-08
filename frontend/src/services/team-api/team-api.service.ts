import { ITeam, ITeamCreation, ITeamEditing } from 'common/interfaces/team';
import { Http } from 'services/http/http.service';
import { ContentType, HttpMethod } from 'common/enums/enums';

class TeamApi {
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

  public async updateTeam(payload: ITeamEditing): Promise<ITeam> {
    return this.http.load(`${this.BASE}/teams/${payload.id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async deleteTeam(payload: string): Promise<ITeam> {
    return this.http.load(`${this.BASE}/teams/${payload}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { TeamApi };
