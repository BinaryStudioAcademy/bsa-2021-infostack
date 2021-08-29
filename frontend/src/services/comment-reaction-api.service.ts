import { http } from 'services';
import { ICommentReaction } from 'common/interfaces';
import { HttpMethod, ContentType } from 'common/enums';

class CommentReactionApi {
  private http = http;
  private BASE = '/api/comments';

  public async handleCommentReaction(
    commentId: string,
    reaction: string,
  ): Promise<ICommentReaction[]> {
    return this.http.load(`${this.BASE}/${commentId}/reactions`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ reaction }),
      contentType: ContentType.JSON,
    });
  }
}

export const commentReactionApi = new CommentReactionApi();
