import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useState } from 'hooks/hooks';
import { containsNoEmptyStrings } from 'helpers/helpers';
import { AuthApi } from '../../services';
import { toast } from 'react-toastify';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSendingMail, setIsSendingMail] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (!containsNoEmptyStrings([email])) {
      return;
    }

    setIsSendingMail(true);

    await new AuthApi().resetPassword({ email });

    toast.info(
      'We sent you an email to reset your password. Please check your mailbox.',
    );

    setEmail('');
    setIsSendingMail(false);
  };

  // const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(event.target.value);
  // };

  return (
    <Sign
      header="Reset password"
      secondaryText="Enter your email to reset your password."
      submitText="Reset password"
      onSubmit={handleSubmit}
      isSubmitDisabled={isSendingMail}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        // name="email"
        controlId="resetPasswordEmail"
        // value={email}
        // onChange={onEmailChange}
      />
    </Sign>
  );
};

export default ResetPassword;
