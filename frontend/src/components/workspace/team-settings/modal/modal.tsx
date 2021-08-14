import { toast } from 'react-toastify';
import { useEffect, useState } from 'hooks/hooks';
import { useForm } from 'hooks/hooks';
import { yupResolver, useAppSelector } from 'hooks/hooks';
import { teamNameSchema } from 'validations/team-name-schema';
import { ITeamCreation } from 'common/interfaces/team';
import InputModal from 'components/common/input-modal/input-modal';

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
  const { creatingError } = useAppSelector((state) => state.teams);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (creatingError != '') {
      toast.info(creatingError);
    }
  }, [creatingError]);

  const handleClose = (): void => {
    onModalClose();
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
    onModalClose();

    setSubmitDisabled(false);
    reset({ name: '' });
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
