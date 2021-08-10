import { ContentType, HttpMethod } from 'common/enums/enums';
import { IPage, IPageRequest, IPageFollowed } from 'common/interfaces/pages';
import { http } from 'services/http/http.service';

class PageApi {
  private http = http;
  private BASE = '/api/pages';

  public async createPage(payload: IPageRequest): Promise<IPage> {
    return this.http.load(this.BASE, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async createVersionPage(payload: IPageRequest): Promise<IPage> {
    return this.http.load(`${this.BASE}/:id/version`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPages(): Promise<IPage[]> {
    return this.http.load(this.BASE, {
      method: HttpMethod.GET,
    });
  }

  public async getPage(id?: string ): Promise<IPage> {
    return this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.GET,
    });
  }

  public async getPagesFollowedByUser(userId: string | undefined): Promise<IPageFollowed[]> {
    return this.http.load(`${this.BASE}/following/${userId}`, {
      method: HttpMethod.GET,
    });
  }

  public async followPage(pageId: string | undefined): Promise<IPage[]> {
    return this.http.load(`${this.BASE}/follow/${pageId}`, {
      method: HttpMethod.POST,
    });
  }

  public async unfollowPage(pageId: string | undefined): Promise<IPage[]> {
    return this.http.load(`${this.BASE}/unfollow/${pageId}`, {
      method: HttpMethod.POST,
    });
  }
}

export { PageApi };
