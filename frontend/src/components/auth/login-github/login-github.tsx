import { useHistory, useEffect } from 'hooks/hooks';
import { AppRoute } from 'common/enums';
import { githubApi } from 'services';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const LoginGitHub: React.FC = () => {
  const { push } = useHistory();
  const search = new URL(window.location.href).searchParams;
  const code = search.get('code');

  useEffect(() => {
    if (code) {
      handleGitHub(code);
    } else {
      push(AppRoute.SETTINGS_INTEGRATIONS);
    }
  }, []);

  const handleGitHub = async (code: string): Promise<void> => {
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
