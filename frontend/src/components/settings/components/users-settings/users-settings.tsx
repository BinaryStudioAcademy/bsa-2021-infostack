import { Button, Card, Table } from 'react-bootstrap';
import { UserItem, DeleteUserModal } from './components/components';
import { TableHead } from '../../shared/components/components';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import { usersActions } from 'store/actions';
import { InviteModal } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { RoleType } from 'common/enums';
import { toast } from 'react-toastify';

export const TABLE_HEADERS = [
  'Name',
  'Workspace Role',
  'Team',
  'Status',
  'Actions',
];

const OPTIONS = [
  { label: RoleType.USER, value: RoleType.USER },
  { label: RoleType.ADMIN, value: RoleType.ADMIN },
];

export const UsersSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
  }, []);

  const [isModalShowed, setModalShowed] = useState(false);
  const [isDeleteModalShown, setDeleteModalShown] = useState(false);
  const [userToDeleteName, setUserToDeleteName] = useState('');
  const [userToDeleteId, setUserToDeleteId] = useState('');
  const closeModal = (): void => {
    setModalShowed(false);
  };

  const onUserDelete = (fullName: string, id: string): void => {
    setUserToDeleteName(fullName);
    setUserToDeleteId(id);
    setDeleteModalShown(true);
  };

  const onUserDeleteClose = (): void => {
    setDeleteModalShown(false);
  };

  const handleSelectChange = (
    userId: string,
    role: RoleType,
    fullname: string,
  ): void => {
    dispatch(usersActions.chageRole({ userId, role }))
      .unwrap()
      .then(() =>
        toast.info(`${fullname} role in the workplace has changed to ${role}`),
      )
      .catch(() =>
        toast.error('An error happened while changing role of the user'),
      );
  };

  return (
    <>
      <InviteModal onModalClose={closeModal} showModal={isModalShowed} />
      <DeleteUserModal
        showModal={isDeleteModalShown}
        onModalClose={onUserDeleteClose}
        fullName={userToDeleteName}
        id={userToDeleteId}
      ></DeleteUserModal>
      <Card
        className={`${getAllowedClasses(styles.card)} justify-content-center`}
      >
        <Card.Header
          className={getAllowedClasses(
            'd-flex justify-content-between',
            styles.header,
          )}
        >
          <Card.Title as="h5" className={getAllowedClasses(styles.title)}>
            Users
          </Card.Title>
          <Button
            onClick={(): void => setModalShowed(true)}
            variant="success"
            size="sm"
          >
            Invite
          </Button>
        </Card.Header>

        <Card.Body className={getAllowedClasses(styles.body)}>
          <Table hover>
            <TableHead headers={TABLE_HEADERS} />
            <tbody>
              {users?.map((user) => {
                return (
                  <UserItem
                    key={user.id}
                    onDelete={onUserDelete}
                    onChange={handleSelectChange}
                    options={OPTIONS}
                    className={getAllowedClasses(styles.selectContainer)}
                    {...user}
                  />
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
