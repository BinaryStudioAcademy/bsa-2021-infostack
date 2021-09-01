import { ISkill } from 'common/interfaces/skill';
import { HttpMethod, ContentType } from 'common/enums';
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

  public async delete(id: string): Promise<string> {
    const response: string = await this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.DELETE,
    });
    return response;
  }

  public async update(id: string, name: string): Promise<ISkill> {
    const response: ISkill = await this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
    return response;
  }
}

export const skillApi = new SkillApi();
