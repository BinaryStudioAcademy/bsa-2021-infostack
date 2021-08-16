import { Button, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { tagActions } from 'store/tags';
import { TagAdd, TagCloud } from './components/components';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import './styles.scss';

export const TagSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpenNewTagForm = useAppSelector(
    (state) => state.tags.isOpenNewTagForm,
  );

  useEffect(() => {
    dispatch(tagActions.loadTags());
    return (): void => {
      dispatch(tagActions.resetTags());
    };
  }, []);

  const handleNewTagFormOpen = (): void => {
    dispatch(tagActions.setNewTagForm({ isOpen: true }));
  };

  return (
    <Card
      className={`${getAllowedClasses(styles.card)} justify-content-center`}
    >
      <Card.Header className={getAllowedClasses(styles.header)}>
        <Card.Title className={`${getAllowedClasses(styles.title)} d-flex`}>
          <div>Tags</div>
          {!isOpenNewTagForm && (
            <Button
              className={getAllowedClasses(styles.button)}
              onClick={handleNewTagFormOpen}
            >
              <i className="bi bi-plus-lg text-white"></i>New Tag
            </Button>
          )}
        </Card.Title>
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.body)}>
        {isOpenNewTagForm && <TagAdd />}
        <TagCloud />
      </Card.Body>
    </Card>
  );
};
