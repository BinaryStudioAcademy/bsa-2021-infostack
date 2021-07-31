import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IButton }from 'common/interfaces/components/button';
import { useEffect, useRef } from 'hooks/hooks';
import { focusOnInput } from 'helpers/dom/dom';

interface IPopUpProps {
  query: string;
  isVisible: boolean;
  inputValue: string;
  setPopUpText(value: string): void;
  confirmButton: IButton;
  cancelButton: IButton;
}

const PopUp: React.FC<IPopUpProps> = ({ query, isVisible, inputValue, setPopUpText, confirmButton, cancelButton }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (isVisible) {
      focusOnInput(inputElement.current);
    }
  }, [isVisible]);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setPopUpText(e.currentTarget.value);
  };

  return (
    <Modal show={isVisible}>
      <Modal.Body>
        <p>{query}</p>
        <input
          className="w-100 border-0 border-bottom border-secondary"
          value={inputValue}
          onChange={onInputChange}
          ref={inputElement}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={cancelButton.onClick}>{cancelButton.text}</Button>
        <Button variant="success" onClick={confirmButton.onClick}>{confirmButton.text}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUp;
