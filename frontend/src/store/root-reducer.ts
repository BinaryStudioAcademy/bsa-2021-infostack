import { authReducer as auth } from './auth';
import { pagesReducer as pages } from './pages';

const rootReducer = {
  auth,
  pages,
};

export { rootReducer };
