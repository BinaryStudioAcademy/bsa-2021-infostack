import { IParticipant } from 'common/interfaces/participant';
import { ContentType, HttpMethod } from 'common/enums/enums';
import {
  IPage,
  IPageRequest,
  IPageFollowed,
  IEditPageContent,
  IPageNav,
  IPageTableOfContents,
  IPageContributor,
  IShareLink,
  IPageShare,
  IFoundPageContent,
} from 'common/interfaces/pages';
import { http } from 'services/http.service';
import { ITag } from 'common/interfaces/tag';

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

  public async deletePage(id: string): Promise<void> {
    return this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.DELETE,
    });
  }

  public async createVersionPage(payload: IPageRequest): Promise<IPageNav> {
    return this.http.load(`${this.BASE}/:id/version`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPages(): Promise<IPageNav[]> {
    return this.http.load(this.BASE, {
      method: HttpMethod.GET,
    });
  }

  public async getPage(id?: string): Promise<IPage> {
    return this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.GET,
    });
  }

  public async getPermissions(id: string): Promise<IParticipant[]> {
    return this.http.load(`${this.BASE}/${id}/permissions`, {
      method: HttpMethod.GET,
    });
  }

  public async getPagesFollowedByUser(
    userId: string | undefined,
  ): Promise<IPageFollowed[]> {
    return this.http.load(`${this.BASE}/following/${userId}`, {
      method: HttpMethod.GET,
    });
  }

  public async setPermission(
    id: string,
    payload: IParticipant,
  ): Promise<IParticipant> {
    return this.http.load(`${this.BASE}/${id}/permissions`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async deletePermission(
    id: string,
    participantType: string,
    participantId: string,
  ): Promise<void> {
    return this.http.load(
      `${this.BASE}/${id}/permissions/${participantType}/${participantId}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  public async deleteAllPermissionsForUser(userId: string): Promise<void> {
    return this.http.load(`${this.BASE}/permissions/${userId}`, {
      method: HttpMethod.DELETE,
    });
  }

  public async deleteAllFollowingsForUser(userId: string): Promise<void> {
    return this.http.load(`${this.BASE}/unfollow-all/${userId}`, {
      method: HttpMethod.DELETE,
    });
  }

  public async followPage(pageId: string | undefined): Promise<void> {
    return this.http.load(`${this.BASE}/follow/${pageId}`, {
      method: HttpMethod.POST,
    });
  }

  public async followPages(pageIds: string[]): Promise<void> {
    return this.http.load(`${this.BASE}/follow`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(pageIds),
    });
  }

  public async unfollowPage(pageId: string | undefined): Promise<void> {
    return this.http.load(`${this.BASE}/unfollow/${pageId}`, {
      method: HttpMethod.POST,
    });
  }

  public async unfollowPages(pageIds: string[]): Promise<void> {
    return this.http.load(`${this.BASE}/unfollow`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(pageIds),
    });
  }

  public async editPageContent(payload: IEditPageContent): Promise<IPage> {
    return this.http.load(`${this.BASE}/${payload.pageId}/version`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPageContributors(id: string): Promise<IPageContributor[]> {
    return this.http.load(`${this.BASE}/${id}/contributors`);
  }

  public async getPageTags(id: string | undefined): Promise<ITag[]> {
    return this.http.load(`${this.BASE}/${id}/tags`);
  }

  public async savePageTags(
    id: string | undefined,
    payload: (string | undefined)[],
  ): Promise<ITag[]> {
    return this.http.load(`${this.BASE}/${id}/tags`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPageTableOfContents(
    id: string,
  ): Promise<IPageTableOfContents> {
    return this.http.load(`${this.BASE}/${id}/table-of-contents`);
  }

  public async getPageTableOfContentsShared(
    query: string,
  ): Promise<IPageTableOfContents> {
    return this.http.load(`${this.BASE}/table-of-contents/share${query}`);
  }

  public async createShareLink(payload: IShareLink): Promise<string> {
    return this.http.load(`${this.BASE}/share/${payload.id}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async sendSharedLinkByEmail(payload: IPageShare): Promise<void> {
    return this.http.load(`${this.BASE}/share-by-email`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
  public async getPageVersionTableOfContents(
    id: string,
    versionId: string,
  ): Promise<IPageTableOfContents> {
    return this.http.load(
      `${this.BASE}/${id}/version/${versionId}/table-of-contents`,
    );
  }

  public async searchPageContent(query: string): Promise<IFoundPageContent[]> {
    return this.http.load(`${this.BASE}/search?query=${query}`);
  }

  public async editDraft(payload: IEditPageContent): Promise<IPage> {
    return this.http.load(`${this.BASE}/${payload.pageId}/draft`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public async getPageShared(query?: string): Promise<IPage> {
    return this.http.load(`${this.BASE}/share/link${query}`, {
      method: HttpMethod.GET,
    });
  }

  public async deleteDraft(id: string): Promise<void> {
    return this.http.load(`${this.BASE}/${id}/draft`, {
      method: HttpMethod.DELETE,
    });
  }
}

export const pageApi = new PageApi();
