import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useRef, useState } from 'hooks/hooks';
import { tagActions } from 'store/tags';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const TagEdit: React.FC<{
  newTagInputRef: React.RefObject<HTMLInputElement>;
}> = ({ newTagInputRef }) => {
  const dispatch = useAppDispatch();
  const [id, name, error] = useAppSelector((state) => [
    state.tags.tagEditId,
    state.tags.tagEditName,
    state.tags.tagEditError,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const editTagInputRef = useRef<HTMLInputElement>(null);

  const handleCancel = async (): Promise<void> => {
    dispatch(tagActions.setTagToEdit(null));
    newTagInputRef.current?.focus();
  };

  if (editTagInputRef.current) {
    // Do not change to newTagInputRef.curent.value = name && error ? name : ''
    // as it will cause UI cursor bug
    // It is not about assigning specific value
    // First of all it checks whether to assign new value or not
    if (name && error) {
      editTagInputRef.current.value = name;
    }
  }

  const handleSave = async (): Promise<void> => {
    if (id && editTagInputRef.current) {
      setIsLoading(true);
      editTagInputRef.current.blur();
      await dispatch(
        tagActions.requestUpdate({ id, name: editTagInputRef.current.value }),
      );
      setIsLoading(false);
    }
    // Separate editTagInputRef.current check is required after dispatch
    // To prevent a bug of this component already unmounted and setting focus on null
    if (editTagInputRef.current) {
      editTagInputRef.current.focus();
    } else {
      newTagInputRef.current?.focus();
    }
  };

  return (
    <tr className={getAllowedClasses(styles.tr)}>
      <td className={getAllowedClasses(styles.tdInput)}>
        <Form
          onSubmit={(evt): void => {
            evt.preventDefault();
            handleSave();
          }}
          validated={error ? false : undefined}
        >
          <Form.Control
            ref={editTagInputRef}
            autoFocus
            defaultValue={name || ''}
            onBlur={({ target }): void => {
              target.value = target.value.trim();
              dispatch(tagActions.setEditName(target.value));
            }}
            onChange={(_evt): void => {
              if (error) dispatch(tagActions.setEditTagError(null));
            }}
            className={getAllowedClasses(styles.input)}
            isInvalid={!!error}
            disabled={isLoading}
          />
          <Form.Control.Feedback
            type="invalid"
            className={getAllowedClasses(styles.feedback)}
          >
            {error}
          </Form.Control.Feedback>
        </Form>
      </td>
      <td className={getAllowedClasses(styles.tdButtonSmall)}>
        <Button onClick={handleSave} variant="success" size="sm">
          Save
        </Button>
      </td>
      <td className={getAllowedClasses(styles.tdButton)}>
        <Button onClick={handleCancel} variant="secondary" size="sm">
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default TagEdit;
