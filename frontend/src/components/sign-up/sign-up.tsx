import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';
import { containsNoEmptyStrings } from 'helpers/helpers';

const SignUp: React.FC = () => {
  const [formState, setFormState] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (!containsNoEmptyStrings(Object.values(formState))) {
      return;
    }

    await dispatch(authActions.register(formState));
    push(AppRoute.WORKSPACES);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const { fullName, email, password } = formState;

  return (
    <Sign
      header="Get Started"
      secondaryText="Start creating the best possible user experience"
      submitText="Sign up"
      onSubmit={handleSubmit}
    >
      <FormField
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        name="fullName"
        controlId="signUpFullName"
        value={fullName}
        onChange={handleChange}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        controlId="signUpEmail"
        value={email}
        onChange={handleChange}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        controlId="signUpPassword"
        value={password}
        onChange={handleChange}
      />
    </Sign>
  );
};

export default SignUp;
