import { toast } from 'react-toastify';
import { useAppDispatch, useForm, useState } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { IWorkspaceInvite } from 'common/interfaces/workspace';
import { resetPasswordSchema } from 'validations/reset-password-schema';
import { WorkspaceApi } from 'services';
import { IRegister } from 'common/interfaces/auth';
import { usersActions } from 'store/users';
import InputModal from '../input-modal/input-modal';

type Props = {
  showModal: boolean;
  onModalClose: () => void;
};

const InviteModal: React.FC<Props> = ({ showModal, onModalClose }) => {
  const dispatch = useAppDispatch();
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleClose = (): void => {
    onModalClose();
    reset({ email: '' });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IWorkspaceInvite>({ resolver: yupResolver(resetPasswordSchema) });

  const handleSubmitForm = async (data: IRegister): Promise<void> => {
    setSubmitDisabled(true);

    await new WorkspaceApi().inviteToWorkspace(data);

    onModalClose();
    toast.info('Email with an invitation is sent');

    setSubmitDisabled(false);
    dispatch(usersActions.loadUsers());
    reset({ email: '' });
  };

  return (
    <InputModal
      title="Invite to Workspace"
      showModal={showModal}
      inputName="email"
      placeholder="Enter user email to invite"
      controlId="inviteUserUsingEmail"
      confirmButton={{
        text: 'Send invite',
        onClick: handleSubmit(handleSubmitForm),
        disabled: isSubmitDisabled,
      }}
      cancelButton={{
        text: 'Cancel',
        onClick: handleClose,
        disabled: isSubmitDisabled,
      }}
      register={register('email')}
      errors={errors.email}
    />
  );
};
export default InviteModal;
