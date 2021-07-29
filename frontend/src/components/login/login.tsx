import FormField from 'components/common/form-field/form-field';
import Sign from 'components/common/sign/sign';
import styles from './styles.module.scss';

const Login: React.FC = () => (
  <Sign
    header="Welcome back"
    secondaryText="Sign in to your account to continue"
    onSubmit={(): void => {
      return;
    }}
  >
    <FormField label="Email" type="email" placeholder="Enter your email" />
    <FormField
      label="Password"
      type="password"
      placeholder="Enter your password"
      helper={
        <a href="#" className={styles.link}>
          Forgot password?
        </a>
      }
    />
  </Sign>
);

export default Login;
