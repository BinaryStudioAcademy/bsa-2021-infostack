import 'react-h5-audio-player/lib/styles.css';
import { Button } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/helpers';
import { useState } from 'hooks/hooks';
import RecordModal from '../record-modal/record-modal';
import styles from './styles.module.scss';

type Props = {
  handleRecord: (file: File) => void;
};

export const RecordVoice: React.FC<Props> = ({ handleRecord }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        onClick={(): void => setModalShow(true)}
        className={getAllowedClasses('ms-2', styles.text)}
        variant="success"
      >
        <i
          onClick={(): void => setModalShow(true)}
          className={getAllowedClasses('bi bi-mic')}
        >
          Record
        </i>
      </Button>

      <RecordModal
        completerecord={handleRecord}
        show={modalShow}
        hide={(): void => setModalShow(false)}
      />
    </>
  );
};
