import { http } from 'services/http/http.service';
import { IComment } from 'common/interfaces/comment';

class CommentApi {
  private readonly BASE = '/api/pages';
  private readonly _httpService = http;

  public async getAll(pageId: string): Promise<IComment[]> {
    return this._httpService.load(`${this.BASE}/${pageId}/comments`);
  }
}

export const commentApi = new CommentApi();
