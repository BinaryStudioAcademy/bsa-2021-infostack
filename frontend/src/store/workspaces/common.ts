enum ActionType {
  SET_WORKSPACES = 'setWorkspaces',
  SET_CURRENT_WORKSPACE = 'setCurrentWorkspace',
  UPDATE_CURRENT_WORKSPACE = 'updateCurrentWorkspace',
  REMOVE_CURRENT_WORKSPACE = 'removeCurrentWorkspace',
  SET_CREATING_ERROR = 'setCreatingError',
  REMOVE_CREATING_ERROR = 'removeCreatingError',
  TOGGLE_IS_UPDATING_CURRENT_WORKSPACE = 'toggleIsUpdatingCurrentWorkspace',
  DELETE_CURRENT_WORKSPACE_LOGO = 'deleteCurrentWorkspaceLogo',
  TOGGLE_IS_DELETING_CURRENT_WORKSPACE_LOGO = 'toggleIsDeletingCurrentWorkspaceLogo',
  RESET = 'reset',
}

export { ActionType };
