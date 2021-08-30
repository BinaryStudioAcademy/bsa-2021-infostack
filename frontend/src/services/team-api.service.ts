import { ITeam, ITeamEditing, ITeamAddUser } from 'common/interfaces/team';
import { ContentType, HttpMethod } from 'common/enums';
import { http } from 'services/http.service';

class TeamApi {
  private http = http;
  private BASE = '/api/teams';

  public getTeams(): Promise<ITeam[]> {
    return this.http.load(this.BASE, {
      contentType: ContentType.JSON,
    });
  }

  public getTeamsForUser(userId: string): Promise<ITeam[]> {
    return this.http.load(`${this.BASE}/users/${userId}`, {
      contentType: ContentType.JSON,
    });
  }

  public createTeam(name: string): Promise<ITeam> {
    return this.http.load(this.BASE, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
  }

  public updateTeam(payload: ITeamEditing): Promise<ITeam> {
    return this.http.load(`${this.BASE}/${payload.id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public updateTeamOwner(payload: ITeamEditing): Promise<ITeam> {
    return this.http.load(`${this.BASE}/${payload.id}/owner/${payload.owner}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async deleteTeam(payload: string): Promise<void> {
    return this.http.load(`${this.BASE}/${payload}`, {
      method: HttpMethod.DELETE,
    });
  }

  public getTeam(id?: string): Promise<ITeam> {
    return this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.GET,
    });
  }

  public addUser(payload: ITeamAddUser): Promise<ITeam[]> {
    return this.http.load(
      `${this.BASE}/${payload.teamId}/users/${payload.teamId}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
        contentType: ContentType.JSON,
      },
    );
  }

  public deleteUser(payload: ITeamAddUser): Promise<ITeam[]> {
    return this.http.load(
      `${this.BASE}/${payload.teamId}/users/${payload.teamId}`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(payload),
        contentType: ContentType.JSON,
      },
    );
  }
}

export const teamApi = new TeamApi();
