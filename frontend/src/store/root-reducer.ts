import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { workspaceReducer as workspace } from './workspace';

const rootReducer = {
  counter,
  auth,
  workspace,
};

export { rootReducer };
