import { getAllowedClasses } from 'helpers/dom/dom';
import { useAppDispatch, useState } from 'hooks/hooks';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { tagActions } from 'store/tags';
import styles from '../styles.module.scss';
import './styles.scss';

const TagEdit: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  const dispatch = useAppDispatch();
  const [updatedName, setUpdatedName] = useState(name);

  const handleUpdate = async (): Promise<void> => {
    dispatch(tagActions.requestUpdate({ id, name: updatedName }));
  };

  return (
    <InputGroup>
      <FormControl
        defaultValue={name}
        onBlur={({ target }): void => setUpdatedName(target.value)}
        className={getAllowedClasses(styles.input)}
      />
      <Button
        onClick={(_evt): void => {
          dispatch(tagActions.setTagToEdit(null));
        }}
        className={getAllowedClasses(styles.button)}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
      <Button
        onClick={handleUpdate}
        className={getAllowedClasses(styles.button)}
      >
        <i className="bi bi-save"></i>
      </Button>
    </InputGroup>
  );
};

export default TagEdit;
