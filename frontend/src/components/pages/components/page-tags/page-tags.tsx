import { toast } from 'react-toastify';
import { Badge, Card } from 'react-bootstrap';
import { OptionsType } from 'react-select';
import { ITagSelect } from 'common/interfaces/tag';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { EditModal } from './components/components';
import { pageApi, tagApi } from 'services';
import { tagActions } from 'store/tags';
import { PermissionType, RoleType, TagType } from 'common/enums';
import './page-tags.scss';

const PageTags: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const [allTags, setAllTags] = useState<ITagSelect[]>([]);
  const [pageTags, setPageTags] = useState<ITagSelect[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const isCanManage = currentPage?.permission !== PermissionType.READ;
  const workspaceRole = useAppSelector(
    (state: RootState) => state.workspaces.currentWorkspace?.role,
  );

  const handleInputChange = (inputValue: OptionsType<ITagSelect>): void => {
    const lastTag = inputValue[inputValue.length - 1];

    if (lastTag) {
      const lastTagName = lastTag.value ?? '';

      if (workspaceRole === RoleType.ADMIN && lastTag.__isNew__) {
        tagApi
          .add(lastTagName)
          .then((response: ITagSelect) => {
            setAllTags((oldTags) => {
              const newTags = [...oldTags];
              inputValue[inputValue.length - 1].value = response.id;
              const addedTag = {
                value: response.id,
                label: response.name,
              } as ITagSelect;
              newTags[newTags.length] = addedTag;

              return newTags;
            });
          })
          .catch(() => toast.error('Error: could not add tags.'));
      }

      const result = inputValue.map((item: ITagSelect) => item);

      setPageTags(result);
    } else {
      setPageTags([]);
    }
  };

  const handleManage = (): void => {
    setIsEditMode(!isEditMode);
  };

  const handleDone = (): void => {
    if (workspaceRole !== RoleType.ADMIN) {
      const allTagsIds = allTags.map((tag) => tag.id);
      const pageTagsIds = pageTags.map((tag) => tag.id);

      if (pageTagsIds.some((id) => !allTagsIds.includes(id))) {
        toast.error('Error: you can not add new tags. Must choose available.');
        setIsEditMode(!isEditMode);
        return;
      }
    }

    const tagsRequest: (string | undefined)[] = pageTags.map(
      (item) => item.value,
    );

    pageApi
      .savePageTags(currentPage?.id, tagsRequest)
      .then((tags) => {
        const newPageTags = tags.map((tag) => {
          const { id, name, type } = tag;
          if (type === TagType.GITHUB) {
            return {
              ...tag,
              value: id,
              label: name,
              icon: 'bi bi-github',
            } as ITagSelect;
          }
          return { ...tag, value: id, label: name } as ITagSelect;
        });
        setPageTags(newPageTags);
      })
      .finally(() => setIsEditMode(!isEditMode));
  };

  useEffect(() => {
    if (currentPage) {
      pageApi.getPageTags(currentPage?.id).then((tags) => {
        const newPageTags = tags.map((tag) => {
          const { id, name, type } = tag;
          if (type === TagType.GITHUB) {
            return {
              ...tag,
              value: id,
              label: name,
              icon: 'bi bi-github',
            } as ITagSelect;
          }
          return { ...tag, value: id, label: name } as ITagSelect;
        });
        setPageTags(newPageTags);
      });

      dispatch(tagActions.loadTags())
        .unwrap()
        .then((tags) => {
          const optionTags = tags.map((tag) => {
            const { id, name, type } = tag;
            if (type === TagType.GITHUB) {
              return {
                ...tag,
                value: id,
                label: name,
                icon: 'bi bi-github',
              } as ITagSelect;
            }
            return { ...tag, value: id, label: name } as ITagSelect;
          });
          setAllTags(optionTags as ITagSelect[]);
        });
    }
  }, []);

  return (
    <Card border="light" className="card">
      <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
        Tags
        {isCanManage && (
          <i className="bi bi-pencil tags-edit" onClick={handleManage}></i>
        )}
        <EditModal
          title="Edit tags modal"
          showModal={isEditMode}
          value={pageTags}
          options={allTags}
          confirmButton={{
            text: 'Save',
            onClick: handleDone,
          }}
          cancelButton={{
            text: 'Cancel',
            onClick: handleManage,
          }}
          handleInputChange={handleInputChange}
        />
      </Card.Header>
      {pageTags?.length ? (
        <Card.Body>
          <div className="d-flex align-items-start flex-wrap">
            {pageTags.map(({ id, name, type }) => (
              <Badge pill text="primary" className="tag-badge" key={id}>
                {name}
                {type === TagType.GITHUB && <i className="bi bi-github ms-2" />}
              </Badge>
            ))}
          </div>
        </Card.Body>
      ) : (
        <span className="no-tags">No tags</span>
      )}
    </Card>
  );
};

export default PageTags;
