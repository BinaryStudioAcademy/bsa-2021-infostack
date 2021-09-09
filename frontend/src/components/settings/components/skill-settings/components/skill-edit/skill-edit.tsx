import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useRef, useState } from 'hooks/hooks';
import { skillActions } from 'store/skills';
import { getAllowedClasses } from 'helpers/helpers';
import { authActions } from 'store/auth';
import styles from '../../styles.module.scss';

export const SkillEdit: React.FC<{
  newSkillInputRef: React.RefObject<HTMLInputElement>;
}> = ({ newSkillInputRef }) => {
  const dispatch = useAppDispatch();
  const [id, name, error] = useAppSelector((state) => [
    state.skills.skillEditId,
    state.skills.skillEditName,
    state.skills.skillEditError,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const editSkillInputRef = useRef<HTMLInputElement>(null);

  const handleCancel = async (): Promise<void> => {
    dispatch(skillActions.setSkillToEdit(null));
    newSkillInputRef.current?.focus();
  };

  if (editSkillInputRef.current) {
    if (name && error) {
      editSkillInputRef.current.value = name;
    }
  }

  const handleSave = async (): Promise<void> => {
    if (id && editSkillInputRef.current) {
      setIsLoading(true);
      editSkillInputRef.current.blur();
      await dispatch(
        skillActions.requestUpdate({
          id,
          name: editSkillInputRef.current.value,
        }),
      );
      dispatch(authActions.loadUser());
      setIsLoading(false);
    }
    if (editSkillInputRef.current) {
      editSkillInputRef.current.focus();
    } else {
      newSkillInputRef.current?.focus();
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
            ref={editSkillInputRef}
            autoFocus
            defaultValue={name || ''}
            onBlur={({ target }): void => {
              target.value = target.value.trim();
              dispatch(skillActions.setEditName(target.value));
            }}
            onChange={(_evt): void => {
              if (error) dispatch(skillActions.setEditSkillError(null));
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

export default SkillEdit;
