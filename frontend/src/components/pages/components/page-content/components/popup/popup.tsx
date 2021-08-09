import { Modal, Button } from 'react-bootstrap';
import { IButton }from 'common/interfaces/components/button';
import { useEffect, useRef } from 'hooks/hooks';
import { focusOnInput } from 'helpers/dom/dom';
// import { getAllowedClasses } from 'helpers/dom/dom';
// import styles from './styles.module.scss';

type Props = {
  query: string;
  isVisible: boolean;
  confirmButton: IButton;
  cancelButton: IButton;
};

export const Popup: React.FC<Props> = ({ query, isVisible, confirmButton, cancelButton }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (isVisible) {
      focusOnInput(inputElement.current);
    }
  }, [isVisible]);

  return (
    <Modal show={isVisible} onHide={cancelButton.onClick}>
      <Modal.Header closeButton>
        <Modal.Title className="h6">{query}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={confirmButton.onClick}
          disabled={confirmButton.disabled}
        >
          {confirmButton.text}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
