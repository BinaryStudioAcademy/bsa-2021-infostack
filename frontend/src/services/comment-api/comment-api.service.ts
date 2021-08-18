import { http } from 'services/http/http.service';
import { IComment, ICommentRequest } from 'common/interfaces/comment';
import { ContentType, HttpMethod } from 'common/enums/enums';

class CommentApi {
  private readonly BASE = '/api/pages';
  private readonly _httpService = http;

  public async getAll(pageId: string): Promise<IComment[]> {
    return this._httpService.load(`${this.BASE}/${pageId}/comments`);
  }

  public async addComment(
    pageId: string,
    payload: ICommentRequest,
  ): Promise<IComment> {
    return this._httpService.load(`${this.BASE}/${pageId}/comments`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}

export { CommentApi };
