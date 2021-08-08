enum HttpErrorMessage {
  NO_SUCH_EMAIL = 'No user with such email',
  EMAIL_ALREADY_EXISTS = 'User with such email already exists',
  INVALID_PASSWORD = 'Invalid password',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INVALID_TOKEN = 'Invalid token',
  NO_SUCH_PARENT_COMMENT = 'No parent comment with such id',
  UNAUTHORIZED = 'Unauthorized',
  WORKSPACE_ALREADY_EXISTS = 'Workspace with such title already exists',
}

export { HttpErrorMessage };
