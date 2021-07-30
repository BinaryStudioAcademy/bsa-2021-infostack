import { Table } from 'react-bootstrap';
import AddUser from './add-user/add-user';
import styles from './styles.module.scss';
import TableHead from './table-head/table-head';
import UserItem from './user-item/user-item';

export const TABLE_HEADERS = ['Name', 'Workspace Role', 'Team', 'Actions'];
// TODO: use api data
const USERS = [
  { id: 1, name: 'Some name', role: 'admin', team: 'Team 1' },
  { id: 2, name: 'Some name', role: 'admin', team: 'Team 1' },
];

const UsersSettings: React.FC = () => {
  return (
    <div className={styles.userSettingsContainer}>
      <Table hover>
        <TableHead headers={TABLE_HEADERS} />
        <tbody>
          {USERS.map((user) => {
            return <UserItem key={user.id} {...user} />;
          })}
          <AddUser />
        </tbody>
      </Table>
    </div>
  );
};

export default UsersSettings;
