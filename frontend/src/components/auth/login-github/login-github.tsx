import {
  useHistory,
  useEffect,
  useAppDispatch,
  useLocation,
} from 'hooks/hooks';
import { AppRoute, LocalStorageVariable } from 'common/enums';
import { githubApi } from 'services';
import { authActions } from 'store/actions';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const LoginGitHub: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const search = new URL(window.location.href).searchParams;
  const code = search.get('code');

  const location = useLocation();
  const requestedPage = new URLSearchParams(location.search).get('state');

  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);

  useEffect(() => {
    if (code) {
      handleGitHub(code);
    } else {
      push(AppRoute.SETTINGS_INTEGRATIONS);
    }
  }, []);

  const handleGitHub = async (code: string): Promise<void> => {
    if (!token) {
      await dispatch(authActions.loginGithub(code));
      if (requestedPage) {
        push({ pathname: AppRoute.WORKSPACES, state: { requestedPage } });
      } else {
        push(AppRoute.WORKSPACES);
      }
      return;
    }
    await githubApi.addAccessToken(code);
    push(AppRoute.SETTINGS_INTEGRATIONS);
  };

  return (
    <div className={getAllowedClasses(styles.message)}>
      Sign-in with GitHub. Please wait a bit
    </div>
  );
};

export default LoginGitHub;
