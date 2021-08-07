import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IButton }from 'common/interfaces/components/button';

interface IEditPopUpProps {
  query: string;
  isVisible: boolean;
  inputValue: string;
  setPopUpText(value: string): void;
  confirmButton: IButton;
  cancelButton: IButton;
}

const EditTeamPopUp: React.FC<IEditPopUpProps> = ({ query, isVisible, inputValue, setPopUpText, confirmButton, cancelButton }) => {
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
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={cancelButton.onClick}>{cancelButton.text}</Button>
        <Button variant="primary" onClick={confirmButton.onClick}>{confirmButton.text}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamPopUp;
