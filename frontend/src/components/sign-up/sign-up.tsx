import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../validations/sign-up-schema';
import { IRegister } from 'infostack-shared';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(signUpSchema) });

  const handleSubmitForm = async (data: IRegister): Promise<void> => {
    await dispatch(authActions.register(data));
    push(AppRoute.ROOT);
  };

  return (
    <Sign
      header="Get Started"
      secondaryText="Start creating the best possible user experience"
      submitText="Sign up"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <FormField
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        controlId="signUpFullName"
        register={register('fullName')}
        errors={errors.fullName}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        controlId="signUpEmail"
        register={register('email')}
        errors={errors.email}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Enter password"
        controlId="signUpPassword"
        register={register('password')}
        errors={errors.password}
      />
    </Sign>
  );
};

export default SignUp;
