import { toast } from 'react-toastify';
import { Sign, FormField } from 'components/common/common';
import { AuthApi } from 'services';
import { resetPasswordSchema } from 'validations/reset-password-schema';
import { useForm, useState, yupResolver } from 'hooks/hooks';
import { IResetPassword } from 'common/interfaces/auth';

const ResetPassword: React.FC = () => {
  const [isSendingMail, setIsSendingMail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({ resolver: yupResolver(resetPasswordSchema) });

  const handleSubmitForm = async (data: IResetPassword): Promise<void> => {
    const { email } = data;

    setIsSendingMail(true);

    await new AuthApi().resetPassword({ email });

    toast.info(
      'We sent you an email to reset your password. Please check your mailbox.',
    );

    setIsSendingMail(false);
  };

  return (
    <Sign
      header="Reset password"
      secondaryText="Enter your email to reset your password."
      submitText="Reset password"
      onSubmit={handleSubmit(handleSubmitForm)}
      isSubmitDisabled={isSendingMail}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        controlId="resetPasswordEmail"
        register={register('email')}
        errors={errors.email}
      />
    </Sign>
  );
};

export default ResetPassword;
