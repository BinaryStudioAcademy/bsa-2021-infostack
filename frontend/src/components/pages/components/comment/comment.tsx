import Avatar from 'react-avatar';
import { ListGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useState } from 'hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  avatar: string;
  name: string;
  text: string;
  handleResponse: (text: string) => void;
  children?: JSX.Element[];
};

export const Comment: React.FC<Props> = ({ name, avatar, text, handleResponse, children }) => {
  const [responseText, setResponseText] = useState('');
  const [isFieldVisible, setIsFieldVisible] = useState<boolean>(false);

  const toggleField = (): void =>
    setIsFieldVisible(prev => !prev);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void =>
    setResponseText(value);

  const handleClick = (): void => {
    handleResponse(responseText);
    toggleField();
  };

  return (
    <ListGroup.Item className={getAllowedClasses('d-flex', styles.comment)}>
      <Avatar size="56" name={name} src={avatar} round className="me-3" />
      <div className="w-100">
        <p className={getAllowedClasses('mb-2', styles.userName)}>{name}</p>
        <p className={getAllowedClasses('text-secondary mb-0', styles.text)}>{text}</p>
        <button
          className={getAllowedClasses('text-secondary', styles.respond)}
          onClick={toggleField}
        >
          respond
        </button>
        {isFieldVisible && (
          <InputGroup>
            <FormControl
              value={responseText}
              onChange={handleChange}
              className={styles.text}
              as="textarea"
            />
            <Button onClick={handleClick} className={styles.text}>Send</Button>
          </InputGroup>
        )}
        {children && (
          <ListGroup variant="flush">
            {children}
          </ListGroup>
        )}
      </div>
    </ListGroup.Item>
  );
};
