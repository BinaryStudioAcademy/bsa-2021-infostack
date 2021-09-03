import { AppRoute } from 'common/enums';
import { FormField, Link, Sign } from 'components/common/common';
import { loginSchema } from 'common/validations';
import {
  useAppDispatch,
  useHistory,
  useForm,
  yupResolver,
  useState,
  useLocation,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { ILogin } from 'common/interfaces/auth';
import { IPageRequested } from 'common/interfaces/pages';
import { HttpErrorMessage } from 'common/enums';
import { HttpError } from 'exceptions/exceptions';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const [generalError, setGeneralError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

  const { state } = useLocation<IPageRequested | undefined>();

  const handleSubmitForm = async (data: ILogin): Promise<void> => {
    try {
      await dispatch(authActions.login(data)).unwrap();
      if (state) {
        push({ pathname: AppRoute.WORKSPACES, state });
      } else {
        push(AppRoute.WORKSPACES);
      }
    } catch (err) {
      const error = err as HttpError;
      if (error.message === HttpErrorMessage.INVALID_LOGIN_DATA) {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <Sign
      generalError={generalError}
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
