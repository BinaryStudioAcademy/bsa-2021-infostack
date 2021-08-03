import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import FormField from 'components/common/form-field/form-field';
import Sign from 'components/common/sign/sign';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validations/login-schema';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromValues>({ resolver: yupResolver(loginSchema) });

  const handleSubmitForm = async (data: FromValues): Promise<void> => {
    await dispatch(authActions.login(data));
    push(AppRoute.WORKSPACES);
  };

  interface FromValues {
    email: string;
    password: string;
  }

  return (
    <Sign
      header="Welcome back"
      secondaryText="Sign in to your account to continue"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
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
          <a href="#" className={styles.link}>
            Forgot password?
          </a>
        }
      />
    </Sign>
  );
};

export default Login;
