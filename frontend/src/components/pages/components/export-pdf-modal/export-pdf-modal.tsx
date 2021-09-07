import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useForm, useState, yupResolver } from 'hooks/hooks';
import { IWorkspaceInvite } from 'common/interfaces/workspace';
import { resetPasswordSchema } from 'common/validations';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  show: boolean;
  onModalClose: () => void;
  onDownloadPDF: () => Promise<void>;
  onSendPDF: (email: string) => Promise<void>;
};

export const ExportPDFModal: React.FC<Props> = ({
  show,
  onModalClose,
  onDownloadPDF,
  onSendPDF,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IWorkspaceInvite>({ resolver: yupResolver(resetPasswordSchema) });
  const [isDownloadActive, setIsDownloadActive] = useState(true);
  const [isSendEmailActive, setIsSendEmailActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkboxHandler = (): void => {
    setIsDownloadActive(!isDownloadActive);
    setIsSendEmailActive(!isSendEmailActive);
    reset({ email: '' });
  };

  const downloadPDF = (): void => {
    setIsLoading(true);
    onDownloadPDF().then(() => {
      closeModal();
    });
  };

  const sendEmail = (): void => {
    setIsLoading(true);
    const email = getValues('email');
    onSendPDF(email).then(() => {
      closeModal();
    });
  };

  const closeModal = (): void => {
    setIsDownloadActive(true);
    setIsSendEmailActive(false);
    setIsLoading(false);
    reset({ email: '' });
    onModalClose();
  };

  return (
    <Modal
      dialogClassName="w-25 mw-100 rounded"
      show={show}
      onHide={closeModal}
    >
      {isLoading && (
        <div className={getAllowedClasses(styles.emailSpinner)}>
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      <Modal.Header closeButton>
        <Modal.Title className="h5">
          How do you want to export the page?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Check
          type="radio"
          id="download-pdf"
          name="exportPDF"
          label="Download"
          checked={isDownloadActive}
          onChange={checkboxHandler}
        />

        <Form.Check
          type="radio"
          id="send-pdf"
          name="exportPDF"
          label="Send email"
          checked={isSendEmailActive}
          onChange={checkboxHandler}
        />

        {isSendEmailActive && (
          <>
            <Form.Control
              className={getAllowedClasses(styles.emailInput)}
              {...register('email')}
              type="email"
              placeholder="Enter email"
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors?.email.message}
              </Form.Control.Feedback>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>

        <Button
          variant="success"
          onClick={isDownloadActive ? downloadPDF : handleSubmit(sendEmail)}
        >
          {isDownloadActive ? 'Download' : 'Send'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
