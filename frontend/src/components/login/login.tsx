import * as React from 'react';
import { AppRoute } from 'common/enums/enums';
import FormField from 'components/common/form-field/form-field';
import Sign from 'components/common/sign/sign';
import { useAppDispatch, useHistory } from 'hooks/hooks';
import { authActions } from 'store/auth';
import styles from './styles.module.scss';
import { containsNoEmptyStrings } from 'helpers/helpers';

const Login: React.FC = () => {
  const [formState, setFormState] = React.useState({
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

    await dispatch(authActions.login(formState));
    push(AppRoute.WORKSPACES);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const { email, password } = formState;

  return (
    <Sign
      header="Welcome back"
      secondaryText="Sign in to your account to continue"
      submitText="Sign in"
      onSubmit={handleSubmit}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        controlId="loginEmail"
        value={email}
        onChange={handleChange}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Enter your password"
        helper={
          <a href="#" className={styles.link}>
            Forgot password?
          </a>
        }
        name="password"
        controlId="loginPassword"
        value={password}
        onChange={handleChange}
      />
    </Sign>
  );
};

export default Login;
