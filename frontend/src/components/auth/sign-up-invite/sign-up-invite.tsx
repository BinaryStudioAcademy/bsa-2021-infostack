import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import { Sign, FormField } from 'components/common/common';
import { useHistory, useForm, yupResolver, useEffect } from 'hooks/hooks';
import { authApi, userApi } from 'services';
import { signUpInviteSchema } from 'common/validations';
import { IRegister, IUpdatePasswordAndFullName } from 'common/interfaces/auth';
import { DefaultUserName } from 'common/enums/enums';

const SignUpInvite: React.FC = () => {
  const history = useHistory();

  const query = new URLSearchParams(history.location.search);
  const token = query.get('key') || '';

  if (!token) {
    history.push(AppRoute.LOGIN);
  }

  const checkIfUserExistedBefore = async (): Promise<void> => {
    const isUserNameDefault = await userApi.checkIfUserRegisteredOnInvite(
      token,
    );

    if (!(isUserNameDefault === DefaultUserName.WAITING_FOR_JOIN)) {
      history.push(AppRoute.LOGIN);
    }
  };

  useEffect(() => {
    checkIfUserExistedBefore();
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(signUpInviteSchema) });

  const handleSubmitForm = async (
    data: IUpdatePasswordAndFullName,
  ): Promise<void> => {
    const { password, fullName } = data;

    await authApi.updatePasswordAndFullName({
      token,
      password,
      fullName,
    });
  };

  return (
    <Sign
      header="Register to Continue"
      secondaryText="Let us know your name"
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
        label="Create password"
        type="password"
        placeholder="Enter password"
        controlId="signUpPassword"
        register={register('password')}
        errors={errors.password}
      />
    </Sign>
  );
};

export default SignUpInvite;
