import { ISkill } from 'common/interfaces/skill';
import { Http } from 'services/http/http.service';
import { HttpMethod, ContentType } from 'common/enums/enums';

class SkillApi {
  private http = new Http();
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

export { SkillApi };
