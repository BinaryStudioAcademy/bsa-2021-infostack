import React from 'react';
import { AppRoute } from 'common/enums';
import { Sign, FormField, FormPasswordField } from 'components/common/common';
import { useAppDispatch, useHistory, useForm, yupResolver } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { signUpSchema } from 'common/validations';
import { IRegister } from 'common/interfaces/auth';
import { HttpError } from 'exceptions/exceptions';
import commonStyles from '../styles.module.scss';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(signUpSchema) });

  const handleSubmitForm = async (data: IRegister): Promise<void> => {
    try {
      await dispatch(authActions.register(data)).unwrap();
      push(AppRoute.ROOT);
    } catch (err) {
      const error = err as HttpError;
      if (error.message.toLowerCase().includes('email')) {
        setError('email', error);
      }
      if (error.message.toLowerCase().includes('password')) {
        setError('password', error);
      }
      if (error.message.toLowerCase().includes('name')) {
        setError('fullName', error);
      }
    }
  };

  return (
    <Sign
      header="Get Started"
      secondaryText="Start creating the best possible user experience"
      submitText="Sign up"
      onSubmit={handleSubmit(handleSubmitForm)}
      submitClassName={commonStyles.submitButton}
      altRoute={{
        question: 'Already have an account?',
        linkText: 'Sign in',
        route: AppRoute.LOGIN,
      }}
    >
      <FormField
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        controlId="signUpFullName"
        register={register('fullName')}
        errors={errors.fullName}
        inputClassName={commonStyles.input}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        controlId="signUpEmail"
        register={register('email')}
        errors={errors.email}
        inputClassName={commonStyles.input}
      />
      <FormPasswordField
        label="Password"
        placeholder="Enter password"
        controlId="signUpPassword"
        register={register('password')}
        errors={errors.password}
        inputClassName={commonStyles.input}
      />
    </Sign>
  );
};

export default SignUp;
