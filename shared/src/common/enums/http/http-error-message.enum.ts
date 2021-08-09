enum HttpErrorMessage {
  NO_SUCH_EMAIL = 'No user with such email',
  EMAIL_ALREADY_EXISTS = 'User with such email already exists',
  INVALID_PASSWORD = 'Invalid password',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INVALID_TOKEN = 'Invalid token',
  UNAUTHORIZED = 'Unauthorized',
  WORKSPACE_ALREADY_EXISTS = 'Workspace with such title already exists',
  TEAM_NAME_ALREADY_EXISTS = 'Team with such name already exists',
  TEAM_EMPTY_STRING = 'Team with empty string is not allowed',
}

export { HttpErrorMessage };
