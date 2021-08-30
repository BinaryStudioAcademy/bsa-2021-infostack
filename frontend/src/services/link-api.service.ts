import { ILinkShareable } from 'common/interfaces/links';
import { ContentType, HttpMethod } from 'common/enums';
import { http } from 'services/http.service';

class ShareLinkApi {
  private http = http;
  private BASE = '/api/links';

  public async getLinksByIds(
    pageId: string,
    userId?: string,
  ): Promise<ILinkShareable[]> {
    return this.http.load(`${this.BASE}/page/${pageId}/user/${userId}`, {
      method: HttpMethod.GET,
    });
  }

  public async deactivateLinkById(linkId: string): Promise<void> {
    return this.http.load(`${this.BASE}/${linkId}`, {
      method: HttpMethod.DELETE,
    });
  }

  public async extendLinkById(
    linkId: string,
    timeType: string,
    expirationTime: number,
  ): Promise<void> {
    return this.http.load(`${this.BASE}/${linkId}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ timeType, expirationTime }),
    });
  }
}

export const shareLinkApi = new ShareLinkApi();
