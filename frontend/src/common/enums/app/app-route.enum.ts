enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  LOGIN_GOOGLE = '/login-google',
  LOGIN_GITHUB = '/login-github',
  SIGN_UP = '/signup',
  INVITE = '/invite',
  RESET_PASSWORD = '/reset-password',
  SET_PASSWORD = '/set-password',
  WORKSPACES = '/workspaces',
  PAGE = '/page/:id',
  PAGE_PREVIOUS_VERSION = '/page/:id/version/:versionId',
  PROFILE = '/users/profile/:id',
  SETTINGS = '/settings',
  SETTINGS_PROFILE = '/settings/profile',
  SETTINGS_USERS = '/settings/users',
  SETTINGS_TAGS = '/settings/tags',
  CONTENT_SETTING = '/page/:id/editor',
  SETTINGS_TEAMS = '/settings/teams',
  SETTINGS_INTEGRATIONS = '/settings/integrations',
  SETTINGS_NOTIFICATIONS = '/settings/notifications',
}

export { AppRoute };
