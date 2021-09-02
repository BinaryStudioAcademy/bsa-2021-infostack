import Select from 'react-select';
import { Modal, Button, Table } from 'react-bootstrap';
import { IButton, IParticipant, IOption } from 'common/interfaces';
import { sortObjByName } from 'helpers/helpers';
import { InviteStatus, ParticipantType, PermissionType } from 'common/enums';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import { usersActions, teamsActions, participantsActions } from 'store/actions';
import {
  TableHead,
  Item,
  DeleteParticipantModal,
} from './components/components';
import selectParticipantStyles from './select-participant-styles';

type Props = {
  query: string;
  isVisible: boolean;
  inviteButton: IButton;
  cancelButton: IButton;
};

type participantOption = IOption & IParticipant;

const TABLE_HEADERS = ['Name', 'User or Team', 'Access', ''];

const OPTIONS = [
  { label: PermissionType.ADMIN, value: PermissionType.ADMIN },
  { label: PermissionType.WRITE, value: PermissionType.WRITE },
  { label: PermissionType.READ, value: PermissionType.READ },
];

export const Popup: React.FC<Props> = ({
  query,
  isVisible,
  inviteButton,
  cancelButton,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const { teams } = useAppSelector((state) => state.teams);
  const { currentPage } = useAppSelector((state) => state.pages);
  const { participants } = useAppSelector((state) => state.participants);
  const [isDeleteModalShown, setDeleteModalShown] = useState(false);
  const [participantToDelete, setParticipantToDelete] =
    useState<IParticipant>();

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
    dispatch(teamsActions.fetchTeams());
    if (currentPage?.id) {
      dispatch(participantsActions.loadParticipants(currentPage?.id));
    }
  }, []);

  const handleSelectChange = (
    selectedOption: participantOption | null,
  ): void => {
    if (
      selectedOption &&
      !participants.find((participant) => participant.id === selectedOption.id)
    ) {
      const { id, name, type, role } = selectedOption;
      const participant = { id, name, type, role };
      if (currentPage?.id) {
        dispatch(
          participantsActions.createParticipant({
            pageId: currentPage?.id,
            participant,
          }),
        );
      }
    }
  };

  const handleDeleteItem = (participant: IParticipant): void => {
    setParticipantToDelete(participant);
    setDeleteModalShown(true);
  };

  const onParticipantDeleteClose = (): void => {
    setDeleteModalShown(false);
  };

  const handleRoleChange = (id: string, role: string): void => {
    if (id === user?.id) {
      return;
    }
    const participantToUpdate = participants.find(
      (participant) => participant.id === id,
    );
    if (
      !participantToUpdate?.id ||
      !participantToUpdate.name ||
      !participantToUpdate.type
    ) {
      return;
    }
    const participant = { ...participantToUpdate, role };
    if (currentPage?.id) {
      dispatch(
        participantsActions.chageRole({
          pageId: currentPage?.id,
          participant,
        }),
      );
    }
  };

  const getOptions = (): participantOption[] => {
    const joinedParticipants = users.filter(
      (user) => user.status === InviteStatus.JOINED,
    );
    const mappedParticipants = joinedParticipants
      .map((user) => ({
        id: user.id,
        value: user.fullName,
        label: user.fullName,
        name: user.fullName,
        role: PermissionType.READ,
        type: ParticipantType.USER,
      }))
      .sort(sortObjByName);
    const mappedTeams = teams
      .map((team) => ({
        id: team.id,
        value: team.name,
        label: team.name,
        name: team.name,
        role: PermissionType.READ,
        type: ParticipantType.TEAM,
      }))
      .sort(sortObjByName);
    return [...mappedParticipants, ...mappedTeams];
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
    <>
      {participantToDelete && (
        <DeleteParticipantModal
          showModal={isDeleteModalShown}
          onModalClose={onParticipantDeleteClose}
          participant={participantToDelete}
        ></DeleteParticipantModal>
      )}
      <Modal
        show={isVisible}
        onHide={cancelButton.onClick}
        dialogClassName="w-75 mw-100 rounded"
      >
        <Modal.Header closeButton>
          <div className="d-flex w-100 justify-content-between">
            <Modal.Title className="h5 m-0">{query}</Modal.Title>
            <Button
              variant="success"
              size="sm"
              onClick={inviteButton.onClick}
              className="mx-3"
            >
              {inviteButton.text}
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body className="p-5 pt-3 mb-5 mx-0">
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
                return (
                  <Item
                    key={participant.id}
                    participant={participant}
                    options={OPTIONS}
                    onDelete={handleDeleteItem}
                    onChange={handleRoleChange}
                    removable={participant.id !== currentPage?.authorId}
                  />
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};
