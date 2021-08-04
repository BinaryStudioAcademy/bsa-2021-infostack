import { ContentType, HttpMethod } from 'common/enums/enums';
import { IPage, IPageRequest } from 'common/interfaces/pages';
import { Http } from 'services';

class PageApi {
  public _http: Http;

  constructor () {
    this._http = new Http;
  }

  public async createPage(payload: IPageRequest): Promise<IPage> {
    return this._http.load('/api/pages', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async createVersionPage(payload: IPageRequest): Promise<IPage> {
    return this._http.load('/api/pages/:id/version', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPages(): Promise<IPage[]> {
    return this._http.load('/api/pages', {
      method: HttpMethod.GET,
    });
  }

  public async getPage(id: string | null): Promise<IPage> {
    return this._http.load(`/api/pages/${id}`, {
      method: HttpMethod.GET,
    });
  }

}

export { PageApi };
