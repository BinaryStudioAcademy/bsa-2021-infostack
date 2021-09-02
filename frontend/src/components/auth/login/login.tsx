import { AppRoute } from 'common/enums';
import { FormField, Link, Sign } from 'components/common/common';
import { loginSchema } from 'common/validations';
import { useAppDispatch, useHistory, useForm, yupResolver } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { ILogin } from 'common/interfaces/auth';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { HttpErrorMessage } from 'common/enums';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

  const handleSubmitForm = async (data: ILogin): Promise<void> => {
    try {
      await dispatch(authActions.login(data)).unwrap();
      push(AppRoute.WORKSPACES);
    } catch (err) {
      if (err.message === HttpErrorMessage.NOT_ACTIVATED) {
        setError('email', err);
      }
      if (err.message.toLowerCase().includes('email')) {
        setError('email', err);
      }
      if (err.message.toLowerCase().includes('password')) {
        setError('password', err);
      }
    }
  };

  return (
    <Sign
      header="Welcome back"
      secondaryText="Sign in to your account to continue"
      submitText="Sign in"
      onSubmit={handleSubmit(handleSubmitForm)}
      altRoute={{
        // prettier-ignore
        question: 'Don\'t have an account?',
        linkText: 'Sign up',
        route: AppRoute.SIGN_UP,
      }}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        controlId="loginEmail"
        register={register('email')}
        errors={errors.email}
      />
      <FormField
        register={register('password')}
        label="Password"
        type="password"
        placeholder="Enter your password"
        errors={errors.password}
        helper={
          <Link
            className={getAllowedClasses(styles.link)}
            to={AppRoute.RESET_PASSWORD}
          >
            Forgot password?
          </Link>
        }
      />
    </Sign>
  );
};

export default Login;
