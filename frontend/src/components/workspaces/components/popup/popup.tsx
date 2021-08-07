import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { IButton }from 'common/interfaces/components/button';
import { useEffect, useRef } from 'hooks/hooks';
import { focusOnInput } from 'helpers/dom/dom';

type Props = {
  query: string;
  isVisible: boolean;
  inputValue: string;
  setPopUpText(value: string): void;
  confirmButton: IButton;
  cancelButton: IButton;
  error: string;
};

export const Popup: React.FC<Props> = ({ query, isVisible, inputValue, setPopUpText, confirmButton, cancelButton, error }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (isVisible) {
      focusOnInput(inputElement.current);
    }
  }, [isVisible]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void =>
    setPopUpText(target.value);

  return (
    <Modal show={isVisible} onHide={cancelButton.onClick}>
      <Modal.Header>
        <Modal.Title className="h5 text-secondary">{query}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <FormControl
            value={inputValue}
            onChange={onInputChange}
          />
        </InputGroup>
        {error && <span className="text-danger small">{error}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={cancelButton.onClick}>{cancelButton.text}</Button>
        <Button variant="primary" onClick={confirmButton.onClick}>{confirmButton.text}</Button>
      </Modal.Footer>
    </Modal>
  );
};