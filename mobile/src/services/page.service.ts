import { API_URL } from 'common/constants';
import { IPageNav, IPage, IFoundPageContent } from 'common/interfaces';
import { http } from './http.service';

class PageService {
  private readonly _http = http;
  private readonly _BASE = `${API_URL}/api/pages`;

  getAll(): Promise<IPageNav[]> {
    return this._http.load(this._BASE);
  }

  getPage(id: string): Promise<IPage> {
    return this._http.load(`${this._BASE}/${id}`);
  }

  searchContent(query: string): Promise<IFoundPageContent[]> {
    return this._http.load(`${this._BASE}/search?query=${query}`);
  }
}

export const pageService = new PageService();
