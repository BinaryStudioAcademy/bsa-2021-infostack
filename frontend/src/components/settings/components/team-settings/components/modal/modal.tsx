import { useEffect, useState } from 'hooks/hooks';
import { useForm } from 'hooks/hooks';
import { yupResolver } from 'hooks/hooks';
import { teamNameSchema } from 'common/validations';
import { ITeamCreation } from 'common/interfaces/team';
import { InputModal } from 'components/common/input-modal/input-modal';

type Props = {
  showModal: boolean;
  onModalClose: () => void;
  handleFunction: (data: ITeamCreation) => void;
  inputValue?: string | undefined;
};

export const CreateTeamModal: React.FC<Props> = ({
  showModal,
  onModalClose,
  handleFunction,
  inputValue,
}) => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleClose = (): void => {
    onModalClose();
    reset({ name: inputValue });
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

  useEffect(() => {
    if (inputValue) {
      reset({ name: inputValue });
    }
  }, [inputValue]);

  const handleSubmitForm = async (data: ITeamCreation): Promise<void> => {
    setSubmitDisabled(true);
    handleFunction(data);
    onModalClose();

    setSubmitDisabled(false);
    reset({ name: inputValue });
  };

  return (
    <InputModal
      title="Enter name of team:"
      showModal={showModal}
      inputName="name"
      placeholder="Enter a team name"
      controlId="createTeamUsingName"
      confirmButton={{
        text: 'Save',
        onClick: handleSubmit(handleSubmitForm),
        disabled: isSubmitDisabled,
      }}
      cancelButton={{
        text: 'Cancel',
        onClick: handleClose,
        disabled: isSubmitDisabled,
      }}
      register={register('name')}
      errors={errors.name}
    />
  );
};
