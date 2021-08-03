import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../validations/sign-up-schema';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromValues>({ resolver: yupResolver(signUpSchema) });

  const handleSubmitForm = async (data: FromValues): Promise<void> => {
    await dispatch(authActions.register(data));
    push(AppRoute.ROOT);
  };

  interface FromValues {
    fullName: string;
    email: string;
    password: string;
  }

  return (
    <Sign
      header="Get Started"
      secondaryText="Start creating the best possible user experience"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <FormField
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        name="fullName"
        register={register('fullName')}
        errors={errors.fullName}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        register={register('email')}
        errors={errors.email}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        register={register('password')}
        errors={errors.password}
      />
    </Sign>
  );
};

export default SignUp;
