import { ITag } from 'common/interfaces/tag';
import { HttpMethod, ContentType } from 'common/enums';
import { http } from 'services/http.service';

class TagApi {
  private http = http;
  private BASE = '/api/tags';

  public async add(name: string): Promise<ITag> {
    const response: ITag = await this.http.load(this.BASE, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
    return response;
  }

  public async delete(id: string): Promise<string> {
    const response: string = await this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.DELETE,
    });
    return response;
  }

  public async update(id: string, name: string): Promise<ITag> {
    const response: ITag = await this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
    return response;
  }

  public async getAll(): Promise<ITag[]> {
    const response: ITag[] = await this.http.load(this.BASE);
    return response;
  }
}

export const tagApi = new TagApi();
