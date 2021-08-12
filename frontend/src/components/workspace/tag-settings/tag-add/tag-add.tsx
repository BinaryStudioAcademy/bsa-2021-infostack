import { getAllowedClasses } from 'helpers/dom/dom';
import { useAppDispatch, useState } from 'hooks/hooks';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { tagActions } from 'store/tags';
import styles from '../styles.module.scss';
import './styles.scss';

const TagAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newTagName, setNewTagName] = useState('');

  const handleAddNewTag = async (): Promise<void> => {
    dispatch(tagActions.requestAdd(newTagName));
    setNewTagName('');
  };

  const handleNewTagFormClose = (): void => {
    dispatch(tagActions.setNewTagForm({ isOpen: false }));
  };

  return (
    <Form className="newTagForm">
      <Form.Group>
        <Form.Label className={getAllowedClasses(styles.inputLabel)}>
          New Tag
        </Form.Label>
        <InputGroup>
          <FormControl
            className={getAllowedClasses(styles.input)}
            placeholder="name..."
            value={newTagName}
            onChange={({ target }): void => setNewTagName(target.value)}
          />
          <Button
            onClick={handleNewTagFormClose}
            className={getAllowedClasses(styles.button)}
          >
            <i className="bi  bi-x-lg"></i>
          </Button>
          <Button
            onClick={handleAddNewTag}
            className={getAllowedClasses(styles.button)}
          >
            <i className="bi bi-plus-lg text-white"></i>
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default TagAdd;
