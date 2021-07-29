import * as React from 'react';
import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';

const SignUp: React.FC = () => {
  const [formState, setFormState] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const { fullName, email, password } = formState;

  return (
    <Sign
      header="Get Started"
      secondaryText="Start creating the best possible user experience"
      onSubmit={(): void => {
        return;
      }}
    >
      <FormField
        label="Full Name"
        type="text"
        placeholder="Enter your name"
        name="fullName"
        value={fullName}
        onChange={handleChange}
      />
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
        placeholder="Enter password"
        name="password"
        value={password}
        onChange={handleChange}
      />
    </Sign>
  );
};

export default SignUp;
