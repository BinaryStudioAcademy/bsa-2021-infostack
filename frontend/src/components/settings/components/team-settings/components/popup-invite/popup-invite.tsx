import Select from 'react-select';
import { Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { IButton } from 'common/interfaces';
import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { usersActions, teamsActions } from 'store/actions';
import { TableHead, Item } from './components/components';
import { InviteStatus, RoleType } from 'common/enums';
import { sortObjByName } from 'helpers/helpers';
import { ITeamUser } from 'common/interfaces/team';
import selectParticipantStyles from './select-participant-styles';

type Props = {
  teamId: string;
  owner: string;
  teamUsers: ITeamUser[];
  query: string;
  isVisible: boolean;
  cancelButton: IButton;
};

type participantOption = {
  id: string;
  value: string;
  label: string;
  name: string;
  roleInWorkspace: RoleType;
};

const TABLE_HEADERS = ['Name', 'Workspace Role', 'Actions'];

export const Popup: React.FC<Props> = ({
  owner,
  teamId,
  teamUsers,
  query,
  isVisible,
  cancelButton,
}) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
  }, []);

  const handleSelectChange = (
    selectedOption: participantOption | null,
  ): void => {
    if (
      selectedOption &&
      !teamUsers.find((user) => user.id === selectedOption.id)
    ) {
      const { id } = selectedOption;
      dispatch(
        teamsActions.addUser({
          userId: id,
          teamId: teamId,
        }),
      );
    }
  };

  const handleDeleteItem = (userIdToDelete: string): void => {
    if (teamId) {
      if (userIdToDelete != owner) {
        dispatch(
          teamsActions.deleteUser({ userId: userIdToDelete, teamId: teamId }),
        );
      } else {
        toast.error('Error: you can\'t delete "owner" of the team');
      }
    }
  };

  const handleUpdateTeamOwner = (userIdToSetOwnership: string): void => {
    dispatch(
      teamsActions.setNewTeamOwner({ id: teamId, owner: userIdToSetOwnership }),
    );
  };

  const getOptions = (): participantOption[] => {
    const mappedUsers = users
      .filter((user) => user.status === InviteStatus.JOINED)
      .map((user) => ({
        id: user.id,
        value: user.fullName,
        label: user.fullName,
        name: user.fullName,
        roleInWorkspace: user.role,
      }))
      .sort(sortObjByName);

    return [...mappedUsers];
  };

  const getValue = (): participantOption => ({
    id: '',
    value: '',
    label: '',
    name: '',
    roleInWorkspace: '' as RoleType,
  });

  return (
    <Modal
      show={isVisible}
      onHide={cancelButton.onClick}
      dialogClassName="w-75 mw-100 rounded"
    >
      <Modal.Header closeButton className="p-5 pb-3">
        <div className="d-flex w-100 justify-content-between">
          <Modal.Title className="h5 m-0">{query}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="p-5 pt-3 mb-5">
        <Select
          className="mt-4 mb-5"
          onChange={handleSelectChange}
          value={getValue()}
          options={getOptions()}
          styles={selectParticipantStyles}
          isClearable
          isSearchabl
          autoFocus
        />
        <Table>
          <TableHead headers={TABLE_HEADERS} />
          <tbody>
            {teamUsers?.map((user) => {
              return (
                <Item
                  owner={owner}
                  key={user.id}
                  participant={user}
                  onDelete={handleDeleteItem}
                  setTeamOwner={handleUpdateTeamOwner}
                />
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
