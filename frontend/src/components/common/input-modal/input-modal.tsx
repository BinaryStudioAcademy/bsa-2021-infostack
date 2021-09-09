import { Button, Modal } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldError } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { FormField } from '../form-field/form-field';
import { IButton } from 'common/interfaces';

type Props = {
  title: string;
  showModal: boolean;
  inputName: string;
  placeholder?: string;
  controlId?: string;
  confirmButton?: IButton;
  cancelButton?: IButton;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  resolverSchema?: AnyObjectSchema;
};

export const InputModal: React.FC<Props> = ({
  title,
  showModal,
  inputName,
  placeholder,
  controlId,
  confirmButton,
  cancelButton,
  register,
  errors,
}) => {
  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={showModal}
      onHide={cancelButton?.onClick}
      backdrop="static"
      keyboard={false}
      onSubmit={confirmButton?.onClick}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-0">
        <FormField
          label={inputName[0].toUpperCase() + inputName.slice(1)}
          type={inputName}
          placeholder={placeholder || ''}
          name={inputName}
          controlId={controlId}
          register={register}
          errors={errors}
        />
      </Modal.Body>
      <Modal.Footer>
        {cancelButton && (
          <Button
            variant="secondary"
            onClick={cancelButton.onClick}
            disabled={cancelButton.disabled}
            className="me-2"
          >
            {cancelButton.text}
          </Button>
        )}
        {confirmButton && (
          <Button
            variant="success"
            onClick={confirmButton.onClick}
            disabled={confirmButton.disabled}
          >
            {confirmButton.text}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
