import { toast } from 'react-toastify';
import { Sign, FormField } from 'components/common/common';
import { authApi } from 'services';
import { resetPasswordSchema } from 'common/validations';
import { useForm, useState, yupResolver } from 'hooks/hooks';
import { IResetPassword } from 'common/interfaces/auth';
import { HttpErrorMessage } from 'common/enums';
import { HttpError } from 'exceptions/exceptions';

const ResetPassword: React.FC = () => {
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({ resolver: yupResolver(resetPasswordSchema) });

  const handleSubmitForm = async (data: IResetPassword): Promise<void> => {
    const { email } = data;

    setIsSendingMail(true);

    try {
      await authApi.resetPassword({ email });
      toast.info(
        'We sent you an email to reset your password. Please check your mailbox.',
      );
    } catch (err) {
      const error = err as HttpError;
      if (error.message === HttpErrorMessage.NO_SUCH_EMAIL) {
        setGeneralError(error.message);
      }
    }

    setIsSendingMail(false);
  };

  return (
    <Sign
      generalError={generalError}
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
