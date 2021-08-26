import { Button } from 'react-bootstrap';
import { useState } from 'hooks/hooks';
import { ITeamUser } from 'common/interfaces/team';
import { ConfirmModal } from 'components/common/common';

type Props = {
  owner: string;
  participant: ITeamUser;
  onDelete(id: string): void;
  setTeamOwner(id: string): void;
};

export const Item: React.FC<Props> = ({
  owner,
  participant: { fullName, id, roleInWorkspace },
  onDelete,
  setTeamOwner,
}) => {
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showSetOwnerModal, setShowSetOwnerModal] = useState(false);

  const isUserTeamOwner = id === owner;
  const openSetOwnerModal = (): void => {
    setShowSetOwnerModal(true);
  };

  return (
    <>
      <ConfirmModal
        title="Delete confirmation"
        showModal={showDeleteUserModal}
        modalText={`Are you sure you want to delete ${fullName} from the team?`}
        confirmButton={{
          text: 'Yes',
          onClick: (): void => onDelete(id),
          variant: 'danger',
        }}
        cancelButton={{
          text: 'No',
          onClick: (): void => setShowDeleteUserModal(false),
        }}
      />
      <tr>
        <td>
          {fullName} {id === owner ? '(owner)' : null}
        </td>
        <td>{roleInWorkspace}</td>
        <td>
          <Button
            className="btn-danger"
            onClick={(): void => setShowDeleteUserModal(true)}
            disabled={isUserTeamOwner}
          >
            Delete
          </Button>
          <Button
            className="btn-success ms-2"
            onClick={(): void => openSetOwnerModal()}
            disabled={isUserTeamOwner}
          >
            Make an Owner
          </Button>
        </td>
      </tr>
      <ConfirmModal
        title="Confirm"
        showModal={showSetOwnerModal}
        modalText={`Are you sure you want to make a ${fullName} a team owner?`}
        confirmButton={{
          text: 'Yes',
          onClick: (): void => setTeamOwner(id),
          variant: 'success',
        }}
        cancelButton={{
          text: 'No',
          onClick: (): void => setShowSetOwnerModal(false),
        }}
      />
    </>
  );
};
