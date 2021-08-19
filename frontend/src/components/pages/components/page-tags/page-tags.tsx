import { ITagSelect } from 'common/interfaces/tag';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { Badge, Card, ListGroup } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { CSSObject } from '@emotion/serialize';
import { OptionsType } from 'react-select';
import { PageApi, TagApi } from 'services';
import { tagActions } from 'store/tags';
import './page-tags.scss';
import { PermissionType } from 'common/enums/enums';
import { toast } from 'react-toastify';

const PageTags: React.FC = () => {
  const tagApi = new TagApi();
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const [allTags, setAllTags] = useState<ITagSelect[]>([]);
  const [pageTags, setPageTags] = useState<ITagSelect[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const isCanManage = currentPage?.permission !== PermissionType.READ;

  const handleInputChange = (inputValue: OptionsType<ITagSelect>): void => {
    const lastTag = inputValue[inputValue.length - 1];

    if (lastTag) {
      const lastTagName = lastTag.value ?? '';

      if (
        currentPage?.permission === PermissionType.ADMIN &&
        lastTag.__isNew__
      ) {
        tagApi.add(lastTagName).then((response: ITagSelect) => {
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
        });
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
    if (currentPage?.permission !== PermissionType.ADMIN) {
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

    new PageApi()
      .savePageTags(currentPage?.id, tagsRequest)
      .then((tags) => {
        const newPageTags = tags.map((tag) => {
          const { id, name } = tag;
          return { ...tag, value: id, label: name } as ITagSelect;
        });
        setPageTags(newPageTags);
      })
      .finally(() => setIsEditMode(!isEditMode));
  };

  useEffect(() => {
    if (currentPage) {
      new PageApi().getPageTags(currentPage?.id).then((tags) => {
        const newPageTags = tags.map((tag) => {
          const { id, name } = tag;
          return { ...tag, value: id, label: name } as ITagSelect;
        });
        setPageTags(newPageTags);
      });

      dispatch(tagActions.loadTags())
        .unwrap()
        .then((tags) => {
          const optionTags = tags.map((tag) => {
            const { id, name } = tag;
            return { ...tag, value: id, label: name } as ITagSelect;
          });
          setAllTags(optionTags as ITagSelect[]);
        });
    }
  }, []);

  const PageTagSelect: React.FC = () => {
    return (
      <CreatableSelect
        isMulti
        onChange={handleInputChange}
        value={pageTags}
        options={allTags}
        styles={{
          option: (styles): CSSObject => ({
            ...styles,
            fontSize: '1.2rem',
          }),
          placeholder: (styles): CSSObject => ({
            ...styles,
            fontSize: '1.3rem',
          }),
          multiValueLabel: (styles): CSSObject => ({
            ...styles,
            fontSize: '1.2rem',
          }),
          input: (styles): CSSObject => ({
            ...styles,
            fontSize: '1.3rem',
          }),
        }}
      />
    );
  };

  return (
    <ListGroup.Item className="card-block-item border-light">
      <Card.Title className="d-flex justify-content-between align-items-center h6 text-secondary tags-title">
        <div>Tags</div>
        {isCanManage ? (
          !isEditMode ? (
            <span className="btn-manage text-success" onClick={handleManage}>
              manage
            </span>
          ) : (
            <span
              className="btn-done p-2 bg-success text-white"
              onClick={handleDone}
            >
              done
            </span>
          )
        ) : (
          <></>
        )}
      </Card.Title>
      {!isEditMode ? (
        <div className="d-flex align-items-start flex-wrap">
          {!!pageTags?.length &&
            pageTags.map(({ id, name }) => (
              <Badge pill text="primary" className="tag-badge" key={id}>
                {name}
              </Badge>
            ))}
        </div>
      ) : (
        <PageTagSelect />
      )}
    </ListGroup.Item>
  );
};

export default PageTags;
