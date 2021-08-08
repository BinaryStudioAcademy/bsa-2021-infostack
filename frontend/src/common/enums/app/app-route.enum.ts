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
  WORKSPACE_SETTING = '/workspace/settings',
  SETTINGS_TEAMS = '/settings/teams',
}

export { AppRoute };
