enum HttpErrorMessage {
  NO_SUCH_EMAIL = 'No user with such email',
  EMAIL_ALREADY_EXISTS = 'User with such email already exists',
  INVALID_PASSWORD = 'Invalid password',
  NOT_ACTIVATED = 'This account is not activated, check your email for an invite link',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INVALID_TOKEN = 'Invalid token',
  NO_SUCH_PARENT_COMMENT = 'No parent comment with such id',
  UNAUTHORIZED = 'Unauthorized',
  WORKSPACE_ALREADY_EXISTS = 'Workspace with such title already exists',
  TAG_EMPTY_NAME = 'Empty tag name is not allowed',
  SKILL_EMPTY_NAME = 'Empty skill name is not allowed',
  TAG_IN_WORKSPACE_ALREADY_EXISTS = 'Duplicate workspace tag',
  SKILL_IN_WORKSPACE_ALREADY_EXISTS = 'Duplicate workspace skill',
  TAG_IN_WORKSPACE_NOT_FOUND = 'Tag not found in workspace',
  SKILL_IN_WORKSPACE_NOT_FOUND = 'Skill not found in workspace',
  TEAM_NAME_ALREADY_EXISTS = 'Team with such name already exists',
  TEAM_EMPTY_STRING = 'Team with empty string is not allowed',
  TEAM_OWNER_ID = 'UserId is required to change Team owner',
  DELETED_FROM_WORKSPACE = 'You were deleted from this workspace',
  NO_EMAIL = 'You should have email to login',
}

export { HttpErrorMessage };
