import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector, useForm, useState } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { IWorkspaceInvite } from 'common/interfaces/workspace';
import { resetPasswordSchema } from 'common/validations';
import { workspaceApi } from 'services';
import { IRegister } from 'common/interfaces/auth';
import { usersActions } from 'store/users';
import { InputModal } from '../input-modal/input-modal';
import { InviteStatus } from 'common/enums/invite-status/invite-status';

type Props = {
  showModal: boolean;
  onModalClose: () => void;
};

export const InviteModal: React.FC<Props> = ({ showModal, onModalClose }) => {
  const dispatch = useAppDispatch();
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);

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
    if (data.email !== user?.email) {
      let shouldEmailBeSent = true;
      const userToInvite = users.find((user) => user.email === data.email);
      if (userToInvite) {
        if (
          userToInvite.status === InviteStatus.JOINED ||
          userToInvite.status === InviteStatus.PENDING
        ) {
          shouldEmailBeSent = false;
        }
      }
      if (shouldEmailBeSent) {
        setSubmitDisabled(true);
        await workspaceApi.inviteToWorkspace(data);

        onModalClose();
        toast.info('Email with an invitation is sent');

        setSubmitDisabled(false);
        dispatch(usersActions.fetchUsers());
        reset({ email: '' });
      } else {
        toast.error(
          'Error: Cannot re-invite a user with joined or pending status',
        );
        reset({ email: '' });
      }
    } else {
      toast.error('Error: Cannot invite yourself');
      reset({ email: '' });
    }
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
