import { ISkill } from 'common/interfaces/skill';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { http } from 'services/http.service';

class SkillApi {
  private http = http;
  private BASE = '/api/skills';

  public async getAllSkills(): Promise<ISkill[]> {
    return this.http.load(this.BASE);
  }

  public async createSkill(name: string): Promise<ISkill> {
    return this.http.load(this.BASE, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
  }
}

export const skillApi = new SkillApi();
