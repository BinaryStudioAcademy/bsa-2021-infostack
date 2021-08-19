import { toast } from 'react-toastify';
import {
  useEffect,
  useState,
  useForm,
  yupResolver,
  useAppSelector,
} from 'hooks/hooks';
import { workspaceSchema } from 'common/validations';
import { IWorkspaceCreation } from 'common/interfaces/workspace';
import { InputModal } from 'components/common/common';

type Props = {
  showModal: boolean;
  onModalClose: () => void;
  handleFunction: (data: IWorkspaceCreation) => void;
};

export const CreateWorkspaceModal: React.FC<Props> = ({
  showModal,
  onModalClose,
  handleFunction,
}) => {
  const { creatingError } = useAppSelector((state) => state.workspaces);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (creatingError != '') {
      toast.info(creatingError);
    }
  }, [creatingError]);

  const handleClose = (): void => {
    onModalClose();
    reset({ title: '' });
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IWorkspaceCreation>({ resolver: yupResolver(workspaceSchema) });

  const handleSubmitForm = async (data: IWorkspaceCreation): Promise<void> => {
    setSubmitDisabled(true);
    handleFunction(data);
    onModalClose();

    setSubmitDisabled(false);
    reset({ title: '' });
  };

  return (
    <InputModal
      title="Enter title of workspace:"
      showModal={showModal}
      inputName="title"
      placeholder="Enter a workspace title"
      controlId="createWorkspaceUsingTitle"
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
      register={register('title')}
      errors={errors.title}
    />
  );
};
