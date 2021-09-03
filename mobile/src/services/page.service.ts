import { IPageNav } from 'common/interfaces';
import { IFoundPageContent } from 'infostack-shared';
import { http } from './http.service';

class PageService {
  private readonly _http = http;
  private readonly _BASE = 'http://10.0.2.2:3001/api/pages';

  getAll(): Promise<IPageNav[]> {
    return this._http.load(this._BASE);
  }

  searchContent(query: string): Promise<IFoundPageContent[]> {
    return this._http.load(`${this._BASE}/search?query=${query}`);
  }
}

export const pageService = new PageService();
