import { useAppDispatch, useHistory, useEffect } from 'hooks/hooks';
import { authActions } from 'store/auth';
import { AppRoute } from 'common/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const LoginGoogle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const search = new URL(window.location.href).searchParams;
  const code = search.get('code');

  useEffect(() => {
    if (code) {
      handleGoogle(code);
    } else {
      push(AppRoute.WORKSPACES);
    }
  }, []);

  const handleGoogle = async (code: string): Promise<void> => {
    await dispatch(authActions.loginGoogle(code));
    push(AppRoute.WORKSPACES);
  };

  return (
    <div className={getAllowedClasses(styles.message)}>
      Sign-in with Google. Please wait a bit
    </div>
  );
};

export default LoginGoogle;
