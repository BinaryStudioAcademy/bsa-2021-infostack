import { reducer as teamsReducer } from './slice';
import { actions } from './slice';
import { teamsActions as asyncActions } from './actions';

const teamsActions = { ...asyncActions, ...actions };

export { teamsReducer, teamsActions };
