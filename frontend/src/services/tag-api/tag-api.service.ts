import { ITag } from 'common/interfaces/tag';
import { HttpMethod, ContentType } from 'common/enums/enums';
import { Http } from 'services/http/http.service';

const http = new Http();

class TagApi {
  public async add(name: string): Promise<ITag> {
    const response: ITag = await http.load('/api/tags', {
      method: HttpMethod.POST,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
    return response;
  }

  public async delete(id: string): Promise<string> {
    const response: string = await http.load(`/api/tags/${id}`, {
      method: HttpMethod.DELETE,
    });
    return response;
  }

  public async update(id: string, name: string): Promise<ITag> {
    const response: ITag = await http.load(`/api/tags/${id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify({ name }),
      contentType: ContentType.JSON,
    });
    return response;
  }

  public async getAll(): Promise<ITag[]> {
    const response: ITag[] = await http.load('/api/tags');
    return response;
  }
}

export { TagApi };
