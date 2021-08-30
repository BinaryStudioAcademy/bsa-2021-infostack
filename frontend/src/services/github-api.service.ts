import { ContentType, HttpMethod } from 'common/enums';
import { http } from 'services/http.service';

class GitHubApi {
  private http = http;
  private BASE = '/api/github';

  public async addAccessToken(code: string): Promise<void> {
    return this.http.load(`${this.BASE}/access-token`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ code }),
    });
  }

  public async getUsername(): Promise<{ username: string }> {
    return this.http.load(`${this.BASE}/username`);
  }

  public async getRepos(): Promise<{ repos: string[] }> {
    return this.http.load(`${this.BASE}/repos`);
  }

  public async addCurrentRepo(repo: string): Promise<void> {
    return this.http.load(`${this.BASE}/current-repo`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ repo }),
    });
  }

  public async getCurrentRepo(): Promise<{ currentRepo: string }> {
    return this.http.load(`${this.BASE}/current-repo`);
  }
}

export const githubApi = new GitHubApi();
