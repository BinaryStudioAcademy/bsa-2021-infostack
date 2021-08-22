import { Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useState } from 'hooks/hooks';
import { tagActions } from 'store/tags';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const TagAdd: React.FC<{
  newTagInputRef: React.RefObject<HTMLInputElement>;
}> = ({ newTagInputRef }) => {
  const dispatch = useAppDispatch();
  const [name, error] = useAppSelector((state) => {
    return [state.tags.tagAddName, state.tags.tagAddError];
  });
  const [isLoading, setIsLoading] = useState(false);

  if (newTagInputRef.current) {
    // Do not change to newTagInputRef.curent.value = name && error ? name : ''
    // as it will cause UI cursor bug
    // It is not about assigning specific value
    // First of all it checks whether to assign new value or not
    if (name && error) {
      newTagInputRef.current.value = name;
    }
    if (!name) {
      newTagInputRef.current.value = '';
    }
  }

  const handleAddNewTag = async (): Promise<void> => {
    if (newTagInputRef.current) {
      setIsLoading(true);
      newTagInputRef.current.blur();
      await dispatch(tagActions.requestAdd(newTagInputRef.current.value));
      setIsLoading(false);
      newTagInputRef.current.focus();
    }
  };

  return (
    <Form
      onSubmit={(evt): void => {
        evt.preventDefault();
        handleAddNewTag();
      }}
      validated={error ? false : undefined}
    >
      <Form.Control
        ref={newTagInputRef}
        placeholder="Type a name and press Enter"
        autoFocus
        onBlur={({ target }): void => {
          target.value = target.value.trim();
          dispatch(tagActions.setAddName(target.value));
        }}
        onChange={(): void => {
          if (error) dispatch(tagActions.setAddTagError(null));
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
  );
};
