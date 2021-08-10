import { ITeam, ITeamEditing } from 'common/interfaces/team';
import { Http } from 'services/http/http.service';
import { ContentType, HttpMethod } from 'common/enums/enums';

class TeamApi {
  private http = new Http();
  private BASE = '/api/teams';

  public async loadTeams(): Promise<ITeam[]> {
    return this.http.load(this.BASE, {
      contentType: ContentType.JSON,
    });
  }

  public async createTeam(name: string): Promise<ITeam> {
    return this.http.load(this.BASE, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
  }

  public async updateTeam(payload: ITeamEditing): Promise<ITeam> {
    return this.http.load(`${this.BASE}/${payload.id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async deleteTeam(payload: string): Promise<ITeam> {
    return this.http.load(`${this.BASE}/${payload}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export { TeamApi };
