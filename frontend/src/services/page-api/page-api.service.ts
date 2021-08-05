import { Http } from 'services';
import { IPage } from 'common/interfaces/page';

class PageApi {
  private _http: Http;

  constructor() {
    this._http = new Http;
  }

  public async get(): Promise<IPage[]> {
    return this._http.load('/api/pages');
  }
}

export { PageApi };
