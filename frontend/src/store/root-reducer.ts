import { authReducer as auth } from './auth';
import { workspaceReducer as workspace } from './workspace';

const rootReducer = {
  auth,
  workspace,
};

export { rootReducer };
