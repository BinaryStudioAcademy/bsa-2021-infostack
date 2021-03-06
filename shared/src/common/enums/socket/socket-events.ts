export enum SocketEvents {
  CONNECTION = 'connection',
  PAGE_JOIN = 'page/join',
  PAGE_NEW_COMMENT = 'page/newComment',
  PAGE_DELETE_COMMENT = 'page/deleteComment',
  PAGE_NEW_CONTENT = 'page/newContent',
  APP_JOIN = 'app/join',
  NOTIFICATION_NEW = 'notification/new',
  NOTIFICATION_DELETE = 'notification/delete',
  EDITOR_JOIN = 'editor/join',
  EDITOR_LEFT = 'editor/left',
  EDITOR_NEW_CONTENT = 'editor/newContent',
  WORKSPACE_DELETE_USER = 'workspace/deleteUser',
  SIGN_OUT = 'app/signOut',
}
