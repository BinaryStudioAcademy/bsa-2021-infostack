import { Modal, Button } from 'react-bootstrap';
import { useState } from 'hooks/hooks';
import { useForm } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/dom';
import FormField from 'components/common/form-field/form-field';
import { yupResolver } from 'hooks/hooks';
import { teamNameSchema } from 'validations/team-name-schema';
import { ITeamCreation } from 'common/interfaces/team';

type Props = {
  title: string;
  showPopup: boolean;
  onPopupClose: () => void;
  handleFunction: (data: ITeamCreation) => void;
  inputValue?: string | undefined;
};

export const Popup: React.FC<Props> = ({
  title,
  showPopup,
  onPopupClose,
  handleFunction,
  inputValue,
}) => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleClose = (): void => {
    onPopupClose();
    reset({ name: '' });
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ITeamCreation>({
    resolver: yupResolver(teamNameSchema),
    defaultValues: {
      name: inputValue,
    },
  });

  const handleSubmitForm = async (data: ITeamCreation): Promise<void> => {
    setSubmitDisabled(true);
    handleFunction(data);
    onPopupClose();

    setSubmitDisabled(false);
    reset({ name: '' });
  };

  return (
    <Modal
      className={getAllowedClasses('d-flex align-items-center')}
      dialogClassName="w-25 rounded"
      show={showPopup}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormField
          label="Name"
          type="name"
          placeholder="Enter a team name"
          name="name"
          controlId="createTeamName"
          register={register('name')}
          errors={errors.name}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitDisabled}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(handleSubmitForm)}
          disabled={isSubmitDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
