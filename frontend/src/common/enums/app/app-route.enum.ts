enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  RESET_PASSWORD = '/reset-password',
  SET_PASSWORD = '/set-password',
  WORKSPACES = '/workspaces',
  PAGE = '/page/:id',
  PROFILE = '/users/profile/:id',
  SETTINGS = '/settings',
  SETTINGS_PROFILE = '/settings/profile',
  SETTINGS_USERS = '/settings/users',
  SETTINGS_TAGS = '/settings/tags',
  WORKSPACE_SETTING = '/workspace/settings',
}

export { AppRoute };
