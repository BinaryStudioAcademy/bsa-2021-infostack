import * as React from 'react';
import FormField from 'components/common/form-field/form-field';
import Sign from 'components/common/sign/sign';
import styles from './styles.module.scss';

const Login: React.FC = () => {
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const { email, password } = formState;

  return (
    <Sign
      header="Welcome back"
      secondaryText="Sign in to your account to continue"
      onSubmit={(): void => {
        return;
      }}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
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
        value={password}
        onChange={handleChange}
      />
    </Sign>
  );
};

export default Login;
