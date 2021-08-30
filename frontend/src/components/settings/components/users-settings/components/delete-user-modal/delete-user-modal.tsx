import { toast } from 'react-toastify';
import { workspaceApi } from 'services';
import { useAppDispatch, useState } from 'hooks/hooks';
import { usersActions } from 'store/users';
import { ConfirmModal } from 'components/common/common';

type Props = {
  showModal: boolean;
  fullName: string;
  id: string;
  onModalClose: () => void;
};

export const DeleteUserModal: React.FC<Props> = ({
  showModal,
  fullName,
  id,
  onModalClose,
}) => {
  const [isDeleteDisabled, setDeleteDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async (): Promise<void> => {
    setDeleteDisabled(true);

    await workspaceApi.deleteUserFromWorkspace(id);

    onModalClose();
    toast.info('User was deleted');

    setDeleteDisabled(false);
    dispatch(usersActions.fetchUsers());
  };

  return (
    <ConfirmModal
      title="Delete confirmation"
      showModal={showModal}
      modalText={`Are you sure you want to delete ${fullName}?`}
      confirmButton={{
        text: 'Yes',
        onClick: handleDelete,
        disabled: isDeleteDisabled,
        variant: 'danger',
      }}
      cancelButton={{
        text: 'No',
        onClick: onModalClose,
        disabled: isDeleteDisabled,
      }}
    />
  );
};
