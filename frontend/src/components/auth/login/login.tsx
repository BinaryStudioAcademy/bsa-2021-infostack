import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import { FormField, Link, Sign } from 'components/common/common';
import { loginSchema } from 'common/validations';
import { useAppDispatch, useHistory, useForm, yupResolver } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { ILogin } from 'common/interfaces/auth';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

  const handleSubmitForm = async (data: ILogin): Promise<void> => {
    await dispatch(authActions.login(data));
    push(AppRoute.WORKSPACES);
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
