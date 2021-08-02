import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';

const rootReducer = {
  counter,
  auth,
  pages,
};

export { rootReducer };
