import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import useCountDown from 'react-countdown-hook';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import 'react-h5-audio-player/lib/styles.css';
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
  const [audioDuration, setAudioDuration] = useState(0);
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
    if (timeLeft <= 999) {
      stopButton.current && stopButton.current.click();
    }
    if (timeLeft > 0) {
      setAudioDuration(timeLeft);
    }
  }, [timeLeft]);

  let seconds = (60 - timeLeft / 1000).toString();
  const secToShow = seconds.length < 2 ? (seconds = '0' + seconds) : seconds;

  let recorderDuration = (60 - audioDuration / 1000).toString();
  const durToShow =
    recorderDuration.length < 2
      ? (recorderDuration = '0' + recorderDuration)
      : recorderDuration;

  return (
    <Modal
      {...props}
      onHide={onCancel}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modalWindow"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Audio Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={getAllowedClasses(styles.modalBody, 'text-center')}
      >
        {!isRecording && !isCompleteRecord && (
          <>
            <p>Record duration is limited: 1 min</p>
            <p className={getAllowedClasses(styles.timer)}>00:00</p>
          </>
        )}
        {!isRecording && !isCompleteRecord && (
          <Button
            onClick={onStartRecord}
            className={getAllowedClasses(styles.text, styles.recordButton)}
            variant="danger"
          >
            <i
              className={getAllowedClasses(styles.startRecordMic, 'bi bi-mic')}
            />
          </Button>
        )}

        {isRecording && (
          <div>
            {!isPaused ? 'Recording' : 'On pause'}
            <p
              className={getAllowedClasses(styles.timer)}
            >{`00:${secToShow}`}</p>
            {isRecording && (
              <div
                className={getAllowedClasses(
                  styles.btnContainer,
                  'd-flex justify-content-around align-items-center',
                )}
              >
                <div className="d-flex align-items-center w-25">
                  <Button
                    ref={pauseButton}
                    className={getAllowedClasses(styles.pauseButton, 'd-flex')}
                    variant="white"
                  >
                    {!isPaused ? (
                      <i
                        className={getAllowedClasses(
                          styles.pauseIcon,
                          'bi bi-pause-fill',
                        )}
                      ></i>
                    ) : (
                      <Button
                        variant="danger"
                        className={getAllowedClasses(styles.resumeButton)}
                      >
                        <i
                          className={getAllowedClasses(
                            styles.resumeRecordMic,
                            'bi bi-mic',
                          )}
                        />
                      </Button>
                    )}
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    ref={stopButton}
                    className={getAllowedClasses(
                      styles.stopButton,
                      'text-danger',
                    )}
                    variant="white"
                  >
                    <Button
                      variant="danger"
                      className={getAllowedClasses(styles.stopButtonIcon)}
                    ></Button>
                    Stop
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {isCompleteRecord && (
          <>
            <p>Record</p>
            <p className={getAllowedClasses(styles.recordedTime)}>
              {`00:${durToShow}`}
            </p>
            <AudioPlayer
              layout="stacked"
              src={audioUrl}
              customProgressBarSection={[
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
                RHAP_UI.VOLUME,
              ]}
              autoPlayAfterSrcChange={false}
              customAdditionalControls={[]}
              customVolumeControls={[]}
              showJumpControls={false}
              timeFormat="mm:ss"
              defaultDuration={`00:${durToShow}`}
            />
            <Button
              onClick={(): void => onCancel()}
              className={styles.trashButton}
              variant="link"
            >
              <i
                className={getAllowedClasses(styles.trashIcon, 'bi bi-trash')}
                data-toggle="tooltip"
                data-placement="left"
                title="Delete audio"
              ></i>
            </Button>
            <Button
              onClick={onPublish}
              className={styles.saveButton}
              variant="link"
            >
              <i
                className={getAllowedClasses(
                  styles.sendIcon,
                  'bi bi-file-earmark-plus',
                )}
                data-toggle="tooltip"
                data-placement="top"
                title="Save audio"
              ></i>
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(): void => onCancel()}
          className={getAllowedClasses(styles.text)}
          variant="secondary"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecordModal;
