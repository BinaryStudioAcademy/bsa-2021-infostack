import { getAllowedClasses } from 'helpers/helpers';
import { useState } from 'hooks/hooks';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { commentApi } from 'services';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.module.scss';
import useCountDown from 'react-countdown-hook';
import { useRef } from 'react';
import { useEffect } from 'react';

type ModalProps = {
  show: boolean;
  onHide: () => void;
  pageid: string;
  parentcommentid?: string;
};

const RecordModal: React.FC<ModalProps> = (modalProps) => {
  const { onHide, pageid } = modalProps;
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleteRecord, setIsCompleteRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [
    timeLeft,
    {
      start: startTimer,
      pause: pauseTimer,
      resume: resumeTimer,
      reset: resetTimer,
    },
  ] = useCountDown(5000, 1000);
  const stopButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (timeLeft <= 1000) {
      stopButton.current && stopButton.current.click();
    }
  }, [timeLeft]);

  const handleSuccess = (stream: MediaStream): void => {
    const options = { mimeType: 'audio/webm; codecs=opus' };
    const recordedChunks: BlobPart[] | undefined = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function (e) {
      if (typeof e.data === 'undefined' || e.data.size === 0) return;

      recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      const url = URL.createObjectURL(new Blob(recordedChunks));
      setAudioUrl(url);
      setIsCompleteRecord(true);

      const audioFile = new File(
        recordedChunks,
        `${new Date().toString()}.webm`,
        {
          type: 'audio/webm; codecs=opus',
        },
      );

      stream.getTracks().forEach((track) => track.stop());
      commentApi
        .uploadAudioComment(pageid, audioFile, audioFile.name)
        .then((res) => {
          console.log(res);
        });
    });

    stopButton.current &&
      stopButton.current.addEventListener('click', function () {
        console.log('STOPRECORD');
        mediaRecorder.stop();
        setIsPaused(false);
        setIsRecording(false);
        resetTimer();
      });

    pauseButton.current &&
      pauseButton.current.addEventListener('click', function () {
        if (mediaRecorder.state === 'recording') {
          pauseTimer();
          mediaRecorder.pause();
          setIsPaused(true);
          console.log('PAUSERECORD');
        } else if (mediaRecorder.state === 'paused') {
          resumeTimer();
          mediaRecorder.resume();
          console.log('RESUMERECORD');
          setIsPaused(false);
        }
      });

    mediaRecorder.start();
    startTimer();
  };

  const onStartRecord = (): void => {
    setIsRecording(true);
    setIsCompleteRecord(false);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  };

  const onCancel = (): void => {
    setIsPaused(false);
    setIsRecording(false);
    setIsCompleteRecord(false);

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
      <Modal.Body className="text-center">
        {isCompleteRecord && (
          <AudioPlayer
            src={audioUrl}
            autoPlayAfterSrcChange={false}
            customAdditionalControls={[]}
          />
        )}
        {isRecording && (
          <>
            <Spinner as="span" animation="grow" variant="danger" />
            {!isPaused ? 'Recording' : 'On pause'}
            <div>{`${timeLeft / 1000}sec`}</div>
          </>
        )}
        {!isRecording && !isCompleteRecord && 'Press start to record'}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(): void => onCancel()}
          className={styles.text}
          variant="warning"
        >
          Cancel
        </Button>
        {!isRecording && (
          <Button
            onClick={onStartRecord}
            className={styles.text}
            variant="success"
          >
            🔴Start
          </Button>
        )}
        {isRecording && (
          <>
            <Button
              id="stopRecord"
              ref={stopButton}
              className={styles.text}
              variant="success"
            >
              ⏹Stop
            </Button>
            <Button
              id="pauseRecord"
              ref={pauseButton}
              className={styles.text}
              variant="success"
            >
              {!isPaused ? '⏸Pause' : '⏺Resume record'}
            </Button>
          </>
        )}
        {isCompleteRecord && (
          <Button id="publishRecord" className={styles.text} variant="success">
            Publish record
          </Button>
        )}
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
