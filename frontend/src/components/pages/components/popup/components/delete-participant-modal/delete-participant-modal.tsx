import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { participantsActions } from 'store/participants';
import { IParticipant } from 'common/interfaces/participant';
import { ConfirmModal } from 'components/common/common';

type Props = {
  showModal: boolean;
  participant: IParticipant;
  onModalClose: () => void;
};

export const DeleteParticipantModal: React.FC<Props> = ({
  showModal,
  participant,
  onModalClose,
}) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.pages);

  const handleDelete = (): void => {
    if (currentPage?.id) {
      dispatch(
        participantsActions.deleteParticipant({
          pageId: currentPage?.id,
          participantType: participant.type,
          participantId: participant.id,
        }),
      );
    }
    onModalClose();
    toast.info('Participant was deleted');
  };

  return (
    <ConfirmModal
      title="Delete confirmation"
      showModal={showModal}
      modalText={`Are you sure you want to delete ${participant.name}?`}
      confirmButton={{
        text: 'Yes',
        onClick: handleDelete,
        variant: 'danger',
      }}
      cancelButton={{
        text: 'No',
        onClick: onModalClose,
      }}
    />
  );
};
