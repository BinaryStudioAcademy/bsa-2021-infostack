import { Modal, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import { IButton } from 'common/interfaces/components/button';
import { IParticipant } from 'common/interfaces/participant';
import { IOption } from 'common/interfaces/components/select';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
} from 'hooks/hooks';
import { usersActions } from 'store/actions';
import { teamsActions } from 'store/actions';
import { participantsActions } from 'store/actions';
import TableHead from './components/table-head/table-head';
import Item from './components/item/item';
import { ParticipantType, PermissionType } from 'common/enums/enums';
import selectParticipantStyles from './select-participant-styles';

type Props = {
  query: string;
  isVisible: boolean;
  confirmButton: IButton;
  cancelButton: IButton;
};

type participantOption = IOption & IParticipant;

const TABLE_HEADERS = ['Name', 'User or Team', 'Acces', ''];

const OPTIONS = [
  { label: PermissionType.ADMIN, value: PermissionType.ADMIN },
  { label: PermissionType.WRITE, value: PermissionType.WRITE },
  { label: PermissionType.READ, value: PermissionType.READ },
];

export const Popup: React.FC<Props> = ({ query, isVisible, confirmButton, cancelButton }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { teams } = useAppSelector((state) => state.teams);
  const { currentPage } = useAppSelector((state) => state.pages);
  const { participants } = useAppSelector((state) => state.participants);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
    dispatch(teamsActions.loadTeams());
    if (currentPage?.id) {
      dispatch(participantsActions.loadParticipants(currentPage?.id));
    }
  }, []);

  const handleSelectChange = (selectedOption: participantOption | null): void => {
    if (selectedOption && !participants.find(participant => participant.id === selectedOption.id)) {
      const { id, name, type, role } = selectedOption;
      const participant = { id, name, type, role };
      if (currentPage?.id) {
        dispatch(participantsActions.createParticipant({ pageId: currentPage?.id, participant }));
      }
    }
  };

  const handleDeleteItem = (id: string, type: string): void => {
    if (currentPage?.id) {
      dispatch(participantsActions.deleteParticipant({
        pageId: currentPage?.id,
        participantType: type,
        participantId: id,
      }));
    }
  };

  const handleRoleChange = (id: string, role: string): void => {
    const participantToUpdate = participants.find(participant => participant.id === id);
    if (participantToUpdate?.id && participantToUpdate.name && participantToUpdate.type) {
      const participant = { ...participantToUpdate, role };
      if (currentPage?.id) {
        dispatch(participantsActions.chageRole({
          pageId: currentPage?.id,
          participant,
        }));
      }
    }
  };

  const getOptions = (): participantOption[] => {
    const mappedUsers = users.map(user => ({
      id: user.id,
      value: user.fullName,
      label: user.fullName,
      name: user.fullName,
      role: PermissionType.READ,
      type: ParticipantType.USER,
    }));
    const mappedTeams = teams.map(team => ({
      id: team.id,
      value: team.name,
      label: team.name,
      name: team.name,
      role: PermissionType.READ,
      type: ParticipantType.TEAM,
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
            {participants?.map((participant) => {
              return <Item
                key={participant.id}
                participant={participant}
                options={OPTIONS}
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
