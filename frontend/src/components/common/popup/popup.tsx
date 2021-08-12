import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { IButton } from 'common/interfaces/components/button';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  query: string;
  isVisible: boolean;
  confirmButton: IButton;
  cancelButton: IButton;
  register: UseFormRegisterReturn;
  errors?: FieldError | undefined;
};

export const Popup: React.FC<Props> = ({
  query,
  isVisible,
  confirmButton,
  cancelButton,
  register,
  errors,
}) => {
  return (
    <Modal show={isVisible} onHide={cancelButton.onClick}>
      <Modal.Header>
        <Modal.Title className="h6">{query}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <FormControl
            {...register}
            className={getAllowedClasses(styles.workspaceTitleInput)}
          />
        </InputGroup>
        {errors && <span className="text-danger small">{errors.message}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className={getAllowedClasses(styles.popupButton)}
          onClick={cancelButton.onClick}
        >
          {cancelButton.text}
        </Button>
        <Button
          variant="primary"
          className={getAllowedClasses(styles.popupButton)}
          onClick={confirmButton.onClick}
        >
          {confirmButton.text}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
