import { http } from 'services/http.service';

class GitHubApi {
  private http = http;
  private BASE = '/api/github';

  public async getAccessToken(
    code: string,
  ): Promise<{ githubAccessToken: string }> {
    return this.http.load(`${this.BASE}/accessToken?code=${code}`);
  }
}

export const githubApi = new GitHubApi();
