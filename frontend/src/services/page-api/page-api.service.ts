import { ContentType, HttpMethod } from 'common/enums/enums';
import { IPage, IPageRequest } from 'common/interfaces/pages';

class PageApi {
  // eslint-disable-next-line
  public _http: any;
  // eslint-disable-next-line
  constructor ({ Http }: any ) {
    this._http = Http;
  }
  
  public async createPage(payload: IPageRequest): Promise<IPage> {
    return this._http.load('/pages', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
  
  public async createVersionPage(payload: IPageRequest): Promise<IPage> {
    return this._http.load('/pages/:id/version', {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPages(): Promise<IPage[]> {
    return this._http.load('/pages', {
      method: HttpMethod.GET,
    });
  }

  public async getPage(id: string): Promise<IPage> {
    return this._http.load(`/pages/${id}`, {
      method: HttpMethod.GET,
    });
  }
  
}

export { PageApi };