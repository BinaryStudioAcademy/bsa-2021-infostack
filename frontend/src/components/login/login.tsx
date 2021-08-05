import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import FormField from 'components/common/form-field/form-field';
import Sign from 'components/common/sign/sign';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';
import { useForm } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { loginSchema } from 'validations/login-schema';
import { ILogin } from 'infostack-shared';
import { Link } from 'components/common/common';
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
          <Link className={styles.link} to={AppRoute.RESET_PASSWORD}>
            Forgot password?
          </Link>
        }
      />
    </Sign>
  );
};

export default Login;
