import { ITeam, ITeamEditing } from 'common/interfaces/team';
import { ContentType, HttpMethod } from 'common/enums/enums';
import { http } from 'services/http/http.service';

class TeamApi {
  private http = http;
  private BASE = '/api/teams';

  public async getTeams(): Promise<ITeam[]> {
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

  public async getTeam(id?: string): Promise<ITeam> {
    return this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.GET,
    });
  }
}

export { TeamApi };
