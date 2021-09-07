import 'react-h5-audio-player/lib/styles.css';
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
      <i
        onClick={(): void => setModalShow(true)}
        className={getAllowedClasses('bi bi-mic', styles.microphoneIcon)}
      ></i>

      <RecordModal
        completerecord={handleRecord}
        show={modalShow}
        hide={(): void => setModalShow(false)}
      />
    </>
  );
};
