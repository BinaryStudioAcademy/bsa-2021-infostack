import { http } from 'services/http.service';
import {
  IComment,
  ICommentRequest,
  ICommentResponse,
} from 'common/interfaces/comment';
import { ContentType, HttpMethod } from 'common/enums/enums';

class CommentApi {
  private readonly BASE = '/api/pages';
  private readonly _httpService = http;

  public getAll(pageId: string): Promise<ICommentResponse[]> {
    return this._httpService.load(`${this.BASE}/${pageId}/comments`);
  }

  public add(pageId: string, payload: ICommentRequest): Promise<IComment> {
    return this._httpService.load(`${this.BASE}/${pageId}/comments`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public delete(id: string, pageId: string): Promise<void> {
    return this._httpService.load(`${this.BASE}/${pageId}/comments/${id}`, {
      method: HttpMethod.DELETE,
    });
  }
}

export const commentApi = new CommentApi();
