import { authReducer as auth } from './auth';
import { pageReducer as pages } from './pages';

const rootReducer = {
  auth,
  pages,
};

export { rootReducer };
