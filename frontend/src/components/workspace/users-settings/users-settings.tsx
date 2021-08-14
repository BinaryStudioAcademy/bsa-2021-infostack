import { Button, Card, Table } from 'react-bootstrap';
import styles from './styles.module.scss';
import TableHead from './table-head/table-head';
import UserItem from './user-item/user-item';
import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { usersActions } from 'store/actions';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useState } from 'react';
import InviteModal from 'components/common/invite-modal/invite-modal';

export const TABLE_HEADERS = [
  'Name',
  'Workspace Role',
  'Team',
  'Status',
  'Actions',
];

const UsersSettings: React.FC = () => {
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

export default UsersSettings;
