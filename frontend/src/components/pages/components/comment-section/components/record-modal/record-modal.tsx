import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AudioPlayer from 'react-h5-audio-player';
import useCountDown from 'react-countdown-hook';
import 'react-h5-audio-player/lib/styles.css';
import { useState, useRef, useEffect } from 'hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  show: boolean;
  hide: () => void;
  completerecord: (file: File) => void;
};

const RecordModal: React.FC<Props> = (props) => {
  const { hide, completerecord, show } = props;
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleteRecord, setIsCompleteRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [audioFile, setAudioFile] = useState<File>();
  const stopButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);
  const [
    timeLeft,
    {
      start: startTimer,
      pause: pauseTimer,
      resume: resumeTimer,
      reset: resetTimer,
    },
  ] = useCountDown(60000, 1000);

  const onStartRecord = (): void => {
    setIsRecording(true);
    setIsCompleteRecord(false);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
      .catch(() => {
        navigator.permissions.query({ name: 'microphone' }).then((result) => {
          if (result.state == 'granted') {
            toast.error('Could not start record');
          }

          toast.error('You must enable audio recording');
        });
      });
  };

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
      const recordFile = new File(
        recordedChunks,
        `${new Date().toString()}.webm`,
        {
          type: 'audio/webm; codecs=opus',
        },
      );

      setAudioUrl(url);
      show && setIsCompleteRecord(true);
      setAudioFile(recordFile);

      stream.getTracks().forEach((track) => track.stop());
    });

    stopButton.current &&
      stopButton.current.addEventListener('click', () => {
        mediaRecorder.stop();
        setIsPaused(false);
        setIsRecording(false);
        resetTimer();
      });

    pauseButton.current &&
      pauseButton.current.addEventListener('click', () => {
        if (mediaRecorder.state === 'recording') {
          pauseTimer();
          mediaRecorder.pause();
          setIsPaused(true);
        } else if (mediaRecorder.state === 'paused') {
          resumeTimer();
          mediaRecorder.resume();
          setIsPaused(false);
        }
      });

    mediaRecorder.start();
    startTimer();
  };

  const onCancel = (): void => {
    hide();
    stopButton?.current?.click();
    setIsCompleteRecord(false);
  };

  const onPublish = (): void => {
    completerecord(audioFile as File);
    URL.revokeObjectURL(audioUrl);
    onCancel();
  };

  useEffect(() => {
    if (timeLeft <= 1000) {
      stopButton.current && stopButton.current.click();
    }
  }, [timeLeft]);

  return (
    <Modal
      {...props}
      onHide={onCancel}
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
            defaultDuration="Loading..."
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
            🔴 Start
          </Button>
        )}
        {isRecording && (
          <>
            <Button ref={stopButton} className={styles.text} variant="success">
              ⏹ Stop
            </Button>
            <Button ref={pauseButton} className={styles.text} variant="success">
              {!isPaused ? '⏸ Pause' : '⏺ Resume record'}
            </Button>
          </>
        )}
        {isCompleteRecord && (
          <Button onClick={onPublish} className={styles.text} variant="success">
            Attach audio
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RecordModal;
