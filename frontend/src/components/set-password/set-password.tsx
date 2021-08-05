import Sign from 'components/common/sign/sign';
import FormField from 'components/common/form-field/form-field';
import { useHistory } from 'hooks/hooks';
import { AuthApi } from 'services';
import { AppRoute } from 'common/enums/enums';
import { toast } from 'react-toastify';
import ToastContent from './toast-content/toast-content';
import { setPasswordSchema } from 'validations/set-password-schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISetPasswordValidation } from 'common/interfaces/auth';

const SetPassword: React.FC = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISetPasswordValidation>({
    resolver: yupResolver(setPasswordSchema),
  });

  const query = new URLSearchParams(history.location.search);
  const token = query.get('token') || '';

  if (!token) {
    history.push(AppRoute.LOGIN);
  }

  const handleSubmitForm = async (
    data: ISetPasswordValidation,
  ): Promise<void> => {
    const { password } = data;

    await new AuthApi().setPassword({
      password,
      token,
    });

    toast.info(<ToastContent />, {
      closeOnClick: false,
      pauseOnHover: true,
    });
  };

  return (
    <Sign
      header="Set your new password"
      secondaryText="Enter your new password."
      submitText="Save"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <FormField
        label="Password"
        type="password"
        placeholder="Enter your new password"
        name="password"
        controlId="setPassword"
        register={register('password')}
        errors={errors.password}
      />

      <FormField
        label="Repeat password"
        type="password"
        placeholder="Repeat your new password"
        name="passwordRepeat"
        controlId="setPasswordRepeat"
        register={register('passwordRepeat')}
        errors={errors.passwordRepeat}
      />
    </Sign>
  );
};

export default SetPassword;
