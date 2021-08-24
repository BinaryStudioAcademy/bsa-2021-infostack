import { getAllowedClasses } from 'helpers/helpers';
import { useState } from 'hooks/hooks';
import { Button, Modal } from 'react-bootstrap';
// import { commentApi } from 'services';
import styles from './styles.module.scss';

type ModalProps = {
  show: boolean;
  onHide: () => void;
  pageid: string;
  parentcommentid?: string;
};

const RecordModal: React.FC<ModalProps> = (modalProps) => {
  const { onHide } = modalProps;
  const [isRocording, setIsRecording] = useState(false);

  const handleSuccess = (stream: MediaStream): void => {
    const stopButton = document.getElementById('stopRecord');
    const downloadLink = document.getElementById(
      'download',
    ) as HTMLAnchorElement;

    const options = { mimeType: 'audio/webm; codecs=opus' };
    const recordedChunks: BlobPart[] | undefined = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function (e) {
      if (typeof e.data === 'undefined' || e.data.size === 0) return;

      recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'acetest.webm';

      // const audioFile = new File(recordedChunks, `${new Date().toString()}.webm`,{
      //   type: 'audio/webm; codecs=opus',
      // });

      stream.getTracks().forEach((track) => track.stop());
      // commentApi.uploadAudioComment(pageid, audioFile, audioFile.name);
    });

    stopButton?.addEventListener('click', function () {
      console.log('STOPRECORD');
      mediaRecorder.stop();
      setIsRecording(false);
    });

    mediaRecorder.start(1000);
  };

  const onStartRecord = (): void => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  };

  const onCancel = (): void => {
    setIsRecording(false);
    onHide();
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
          <Button id="stopRecord" className={styles.text} variant="success">
            Stop
          </Button>
        )}
        <a href="#" download="#" id="download">
          Download
        </a>
      </Modal.Footer>
    </Modal>
  );
};

type Props = {
  pageId: string;
  parentCommentId?: string;
};

export const RecordVoice: React.FC<Props> = ({ pageId, parentCommentId }) => {
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
      <RecordModal
        pageid={pageId}
        parentcommentid={parentCommentId}
        show={modalShow}
        onHide={(): void => setModalShow(false)}
      />
    </>
  );
};
