import { useAppDispatch, useForm, useState } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { IWorkspaceInvite } from 'common/interfaces/workspace';
import { resetPasswordSchema } from 'validations/reset-password-schema';
import FormField from 'components/common/form-field/form-field';
import { WorkspaceApi } from 'services';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { IRegister } from 'infostack-shared';
import { usersActions } from 'store/users';

type Props = {
  title: string;
  showModal: boolean;
  onModalClose: () => void;
};

const ModalComponent: React.FC<Props> = ({
  onModalClose,
  title,
  showModal,
}) => {
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
    <>
      <Modal
        className="d-flex align-items-center"
        dialogClassName="w-25 rounded"
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormField
            label="Email"
            type="email"
            placeholder="Enter user email to invite"
            name="email"
            controlId="inviteUserUsingEmail"
            register={register('email')}
            errors={errors.email}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitDisabled}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(handleSubmitForm)}
            disabled={isSubmitDisabled}
          >
            Send invite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalComponent;
