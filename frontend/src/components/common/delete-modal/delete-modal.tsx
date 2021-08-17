import { Button, Modal } from 'react-bootstrap';
import { WorkspaceApi } from 'services';
import { useAppDispatch, useState } from 'hooks/hooks';
import { usersActions } from 'store/users';
import { toast } from 'react-toastify';

type Props = {
  showModal: boolean;
  fullName: string;
  id: string;
  onModalClose: () => void;
};

export const DeleteModal: React.FC<Props> = ({
  showModal,
  fullName,
  id,
  onModalClose,
}) => {
  const [isDeleteDisabled, setDeleteDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    onModalClose();
  };

  const handleDelete = async (): Promise<void> => {
    setDeleteDisabled(true);

    await new WorkspaceApi().deleteUserFromWorkspace(id);

    handleClose();
    toast.info('User was deleted');

    setDeleteDisabled(false);
    dispatch(usersActions.loadUsers());
  };

  return (
    <Modal
      show={showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title className="fs-6" id="contained-modal-title-vcenter">
          Delete confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {fullName}?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleClose}
          disabled={isDeleteDisabled}
        >
          No
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={isDeleteDisabled}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
