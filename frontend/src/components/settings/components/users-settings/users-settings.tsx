import { Button, Card, Table } from 'react-bootstrap';
import { TableHead, UserItem } from './components/components';
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

export const TABLE_HEADERS = [
  'Name',
  'Workspace Role',
  'Team',
  'Status',
  'Actions',
];

export const UsersSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, []);

  const [isModalShowed, setModalShowed] = useState(false);

  const closeModal = (): void => {
    setModalShowed(false);
  };

  return (
    <>
      <InviteModal onModalClose={closeModal} showModal={isModalShowed} />
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
          <Button onClick={(): void => setModalShowed(true)}>Invite</Button>
        </Card.Header>

        <Card.Body className={getAllowedClasses(styles.body)}>
          <Table hover>
            <TableHead headers={TABLE_HEADERS} />
            <tbody>
              {users?.map((user) => {
                return <UserItem key={user.id} {...user} />;
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
