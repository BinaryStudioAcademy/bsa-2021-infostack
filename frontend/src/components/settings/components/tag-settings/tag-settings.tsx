import { Card, Table } from 'react-bootstrap';
import {
  useAppDispatch,
  useEffect,
  useAppSelector,
  useRef,
  useHistory,
} from 'hooks/hooks';
import { tagActions } from 'store/tags';
import { getAllowedClasses } from 'helpers/helpers';
import { TagAdd, TagItem, TagEdit } from './components/components';
import { Spinner } from 'components/common/common';
import { RoleType } from 'common/enums';
import styles from './styles.module.scss';

export const TagSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [tags, tagEditId] = useAppSelector((state) => {
    return [state.tags.tags, state.tags.tagEditId];
  });
  const newTagInputRef = useRef<HTMLInputElement>(null);

  const role = useAppSelector(
    (state) => state.workspaces.currentWorkspace?.role,
  );

  useEffect(() => {
    dispatch(tagActions.loadTags());
    return (): void => {
      dispatch(tagActions.resetTags());
    };
  }, []);

  const history = useHistory();

  if (role !== RoleType.ADMIN) {
    history.push('/*');
  }

  return (
    <Card
      className={`${getAllowedClasses(styles.card)} justify-content-center`}
    >
      <Card.Header
        className={getAllowedClasses(
          'd-flex justify-content-between',
          styles.header,
        )}
      >
        <Card.Title className={getAllowedClasses(styles.title)}>
          Tags
        </Card.Title>
        <TagAdd newTagInputRef={newTagInputRef} />
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.body)}>
        {tags ? (
          tags.length ? (
            <Table hover>
              <tbody>
                {tags?.map((tag) => {
                  if (tag.id === tagEditId) {
                    return (
                      <TagEdit key={tag.id} newTagInputRef={newTagInputRef} />
                    );
                  } else {
                    return (
                      <TagItem
                        key={tag.id}
                        {...tag}
                        newTagInputRef={newTagInputRef}
                      />
                    );
                  }
                })}
              </tbody>
            </Table>
          ) : (
            <div>There is no tags in this workspace. Start adding</div>
          )
        ) : (
          <div className="text-center">
            <Spinner height={'6rem'} width={'6rem'} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
