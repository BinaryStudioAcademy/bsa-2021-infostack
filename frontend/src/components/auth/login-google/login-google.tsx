import {
  useAppDispatch,
  useHistory,
  useEffect,
  useLocation,
} from 'hooks/hooks';
import { authActions } from 'store/auth';
import { AppRoute } from 'common/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const LoginGoogle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const search = new URL(window.location.href).searchParams;
  const code = search.get('code');

  const location = useLocation();
  const requestedPage = new URLSearchParams(location.search).get('state');

  useEffect(() => {
    if (code) {
      handleGoogle(code);
    } else {
      push(AppRoute.WORKSPACES);
    }
  }, []);

  const handleGoogle = async (code: string): Promise<void> => {
    await dispatch(authActions.loginGoogle(code));
    if (requestedPage) {
      push({ pathname: AppRoute.WORKSPACES, state: { requestedPage } });
    } else {
      push(AppRoute.WORKSPACES);
    }
  };

  return (
    <div className={getAllowedClasses(styles.message)}>
      Sign-in with Google. Please wait a bit
    </div>
  );
};

export default LoginGoogle;
