import { useAppDispatch, useAppSelector, useForm, useState } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { IWorkspaceInvite } from 'common/interfaces/workspace';
import { resetPasswordSchema } from 'validations/reset-password-schema';
import FormField from 'components/common/form-field/form-field';
import styles from './styles.module.scss';
import { WorkspaceApi } from 'services';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import { IRegister } from 'infostack-shared';
import { workspaceActions } from 'store/workspace';

type Props = {
  title: string;
  showModal: boolean;
  onModalClose: () => void;
};

const ModalComponent: React.FC<Props> = ({ onModalClose, title, showModal }) => {
  const dispatch = useAppDispatch();
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);

  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleClose = ():void => {
    onModalClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkspaceInvite>({ resolver: yupResolver(resetPasswordSchema) });

  const handleSubmitForm = async (data: IRegister): Promise<void> => {

    setSubmitDisabled(true);

    await new WorkspaceApi().inviteToWorkspace(data);

    onModalClose();
    toast.info(
      'Email with an invitation is sent',
    );

    setSubmitDisabled(false);
    if(currentWorkspace) dispatch(workspaceActions.loadUsers(currentWorkspace.id));

  };

  return (
    <>
      <Modal className={getAllowedClasses('d-flex align-items-center', styles.modalContent)}
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
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitDisabled}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit(handleSubmitForm)} disabled={isSubmitDisabled}>Send invite</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalComponent;
