/* eslint-disable no-console */
import { Modal, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import { IButton } from 'common/interfaces/components/button';
import { IParticipant } from 'common/interfaces/participant';
import { IOption } from 'common/interfaces/components/select';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import { usersActions } from 'store/actions';
import { teamsActions } from 'store/teams';
import TableHead from './components/table-head/table-head';
import Item from './components/item/item';
import { ParticipantsType, PermissionType } from 'common/enums/enums';

type Props = {
  query: string;
  isVisible: boolean;
  confirmButton: IButton;
  cancelButton: IButton;
};

type participantOption = IOption & IParticipant;

export const TABLE_HEADERS = ['Name', 'User or Team', 'Acces', ''];

export const Popup: React.FC<Props> = ({ query, isVisible, confirmButton, cancelButton }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const { teams } = useAppSelector((state) => state.teams);
  const [participants, setParticipants] = useState<IParticipant[]>([{
    id: user?.id || '',
    name: user?.fullName || '',
    type: ParticipantsType.USER,
    role: PermissionType.ADMIN,
  }]);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
    dispatch(teamsActions.loadTeams());
  }, []);

  const handleSelectChange = (selectedOption: participantOption | null): void => {
    if (selectedOption && !participants.find(participant => participant.id === selectedOption.id)) {
      const { id, name, type, role } = selectedOption;
      setParticipants([...participants, { id, name, type, role }]);
    }
  };

  const handleDeleteItem = (id: string): void => {
    const filteredParticipants = participants.filter(participant => participant.id !== id);
    setParticipants(filteredParticipants);
  };

  const handleRoleChange = (id: string, role: string): void => {
    const updatedParticipants = participants.map(participant => {
      if (participant.id === id) {
        return { ...participant, role };
      }
      return participant;
    }) as IParticipant[];
    setParticipants(updatedParticipants);
  };

  const getOptions = (): participantOption[] => {
    const mappedUsers = users.map(user => ({
      id: user.id,
      value: user.fullName,
      label: user.fullName,
      name: user.fullName,
      role: PermissionType.READ,
      type: ParticipantsType.USER,
    }));
    const mappedTeams = teams.map(team => ({
      id: team.id,
      value: team.name,
      label: team.name,
      name: team.name,
      role: PermissionType.READ,
      type: ParticipantsType.TEAM,
    }));
    return [...mappedUsers, ...mappedTeams];
  };

  const getValue = (): participantOption => ({
    id: '',
    value: '',
    label: '',
    name: '',
    type: '',
    role: '',
  });

  return (
    <Modal show={isVisible} onHide={cancelButton.onClick} dialogClassName="w-75 mw-100">
      <Modal.Header closeButton className="p-5 pb-3">
        <div className="d-flex w-100 justify-content-between">
          <Modal.Title className="h5 m-0">{query}</Modal.Title>
          <Button
            variant="primary"
            size="sm"
            onClick={confirmButton.onClick}
            className="mx-3"
          >
            {confirmButton.text}
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="p-5 pt-3">
        <Select
          className="mt-4 mb-5"
          onChange={handleSelectChange}
          value={getValue()}
          options={getOptions()}
          isClearable
          isSearchabl
          autoFocus
        />
        <Table hover>
          <TableHead headers={TABLE_HEADERS} />
          <tbody>
            {console.log(participants)}
            {participants?.map((participant) => {
              return <Item
                key={participant.id}
                participant={participant}
                onDelete={handleDeleteItem}
                onChange={handleRoleChange}
              />;
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
