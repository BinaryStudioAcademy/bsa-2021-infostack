import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useHistory } from 'hooks/hooks';
import { AuthApi, UserApi } from 'services';
import { useForm } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { signUpInviteSchema } from 'validations/sign-up-invite-schema';
import { IRegister, IUpdatePasswordAndFullName, DefaultUserName } from 'infostack-shared';
import { useEffect } from 'react';

const SignUpInvite: React.FC = () => {
  const history = useHistory();

  const query = new URLSearchParams(history.location.search);
  const token = query.get('key') || '';

  if (!token) {
    history.push(AppRoute.LOGIN);
  }

  const checkIfUserExistedBefore = async (): Promise<void>  => {
    const isUserNameDefault = await new UserApi().checkIfUserRegisteredOnInvite(token);

    if(!(isUserNameDefault === DefaultUserName.WAITING_FOR_JOIN)) {
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

  const handleSubmitForm = async (data: IUpdatePasswordAndFullName): Promise<void> => {
    const { password, fullName } = data;

    await new AuthApi().updatePasswordAndFullName({
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
