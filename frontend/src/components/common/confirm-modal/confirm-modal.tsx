import { Button, Modal } from 'react-bootstrap';
import { IButton } from 'common/interfaces';

type Props = {
  title: string;
  showModal: boolean;
  modalText: string;
  confirmButton?: IButton;
  cancelButton?: IButton;
};

export const ConfirmModal: React.FC<Props> = ({
  title,
  showModal,
  modalText,
  confirmButton,
  cancelButton,
}) => {
  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={showModal}
      onHide={cancelButton?.onClick}
      backdrop="static"
      keyboard={false}
      onSubmit={confirmButton?.onClick}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{modalText}</Modal.Body>
      <Modal.Footer>
        {cancelButton && (
          <Button
            variant="secondary"
            onClick={cancelButton.onClick}
            disabled={cancelButton.disabled}
            className="me-2"
          >
            {cancelButton.text}
          </Button>
        )}
        {confirmButton && (
          <Button
            variant={confirmButton.variant || 'success'}
            onClick={confirmButton.onClick}
            disabled={confirmButton.disabled}
          >
            {confirmButton.text}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
