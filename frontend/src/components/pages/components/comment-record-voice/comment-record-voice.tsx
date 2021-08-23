import { getAllowedClasses } from 'helpers/helpers';
import { useState } from 'hooks/hooks';
import { Button, Modal } from 'react-bootstrap';
import styles from './styles.module.scss';

type ModalProps = {
  show: boolean;
  onHide: () => void;
};
const RecordModal: React.FC<ModalProps> = (modalProps) => {
  const [isRocording, setIsRecording] = useState(false);

  const onStartRecord = (): void => {
    setIsRecording(true);
  };

  const onCancel = (): void => {
    setIsRecording(false);
    modalProps.onHide();
  };

  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Voice Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Recording</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(): void => onCancel()}
          className={styles.text}
          variant="warning"
        >
          Cancel
        </Button>
        {!isRocording && (
          <Button
            onClick={onStartRecord}
            className={styles.text}
            variant="success"
          >
            Start
          </Button>
        )}
        {isRocording && (
          <Button
            onClick={modalProps.onHide}
            className={styles.text}
            variant="success"
          >
            Stop
          </Button>
        )}
        {isRocording && (
          <Button
            onClick={modalProps.onHide}
            className={styles.text}
            variant="success"
          >
            Pause
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const RecordVoice: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <i
        onClick={(): void => setModalShow(true)}
        className={getAllowedClasses(
          'bi bi-mic',
          'btn btn-success',
          styles.mic,
        )}
      >
        Record voice
      </i>
      <RecordModal show={modalShow} onHide={(): void => setModalShow(false)} />
    </>
  );
};
