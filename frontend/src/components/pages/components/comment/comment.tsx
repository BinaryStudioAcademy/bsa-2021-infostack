import Avatar from 'react-avatar';
import { ListGroup } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  avatar: string;
  name: string;
  text: string;
  children?: JSX.Element[];
};

export const Comment: React.FC<Props> = ({ name, avatar, text, children }) =>
  <ListGroup.Item className={getAllowedClasses('d-flex p-0', styles.comment)}>
    <Avatar size="56" name={name} src={avatar} round className="me-3" />
    <div>
      <p className={getAllowedClasses('mb-2', styles.userName)}>{name}</p>
      <p className={getAllowedClasses('text-secondary', styles.text)}>{text}</p>
      {children && (
        <ListGroup variant="flush">
          {children}
        </ListGroup>
      )}
    </div>
  </ListGroup.Item>;
