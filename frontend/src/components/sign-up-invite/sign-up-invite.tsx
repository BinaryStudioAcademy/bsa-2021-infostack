import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';
import { useForm } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { signUpInviteSchema } from 'validations/sign-up-invite-schema';
import { IRegister } from 'infostack-shared';

const SignUpInvite: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const history = useHistory();

  const query = new URLSearchParams(history.location.search);

  // eslint-disable-next-line no-console
  console.log('query',query);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(signUpInviteSchema) });

  const handleSubmitForm = async (data: IRegister): Promise<void> => {
    await dispatch(authActions.register(data));
    push(AppRoute.WORKSPACES);
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
        label="Your Email"
        value="invitedEmail@gmail.com"
        type="email"
        placeholder="Enter your email"
        controlId="signUpEmail"
        register={register('email')}
        errors={errors.email}
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
