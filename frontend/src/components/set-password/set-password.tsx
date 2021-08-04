import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useState, useHistory } from 'hooks/hooks';
import { containsNoEmptyStrings } from 'helpers/helpers';
import { AuthApi } from 'services';
import { AppRoute } from 'common/enums/enums';
import { toast } from 'react-toastify';
import ToastContent from './toast-content/toast-content';

const SetPassword: React.FC = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const query = new URLSearchParams(history.location.search);
  const token = query.get('token') || '';

  const isSubmitDisabled =
    isSavingPassword || password !== passwordRepeat || !password;

  if (!token) {
    history.push(AppRoute.LOGIN);
  }

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (!containsNoEmptyStrings([password, passwordRepeat])) {
      return;
    }

    setIsSavingPassword(true);

    await new AuthApi().setPassword({
      password,
      token,
    });

    toast.info(<ToastContent />, {
      closeOnClick: false,
      pauseOnHover: true,
    });

    setPassword('');
    setPasswordRepeat('');
    setIsSavingPassword(false);
  };

  const onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value);
  };

  const onPasswordRepeatChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPasswordRepeat(event.target.value);
  };

  return (
    <Sign
      header="Set your new password"
      secondaryText="Enter your new password."
      submitText="Save"
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <FormField
        label="Password"
        type="password"
        placeholder="Enter your new password"
        name="password"
        controlId="setPassword"
        value={password}
        onChange={onPasswordChange}
      />

      <FormField
        label="Repeat password"
        type="password"
        placeholder="Repeat your new password"
        name="passwordRepeat"
        controlId="setPasswordRepeat"
        value={passwordRepeat}
        onChange={onPasswordRepeatChange}
      />
    </Sign>
  );
};

export default SetPassword;
