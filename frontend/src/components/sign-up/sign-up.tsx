import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';

const SignUp: React.FC = () => (
  <Sign
    header="Get Started"
    secondaryText="Start creating the best possible user experience"
    onSubmit={(): void => {
      return;
    }}
  >
    <FormField label="Full Name" type="text" placeholder="Enter your name" />
    <FormField label="Email" type="email" placeholder="Enter your email" />
    <FormField label="Password" type="password" placeholder="Enter password" />
  </Sign>
);

export default SignUp;
