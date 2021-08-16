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
import { pageApi, TagApi } from 'services';
import { tagActions } from 'store/tags';
import './page-tags.scss';

const PageTags: React.FC = () => {
  const tagApi = new TagApi();
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const [allTags, setAllTags] = useState<ITagSelect[]>([]);
  const [pageTags, setPageTags] = useState<ITagSelect[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleInputChange = (inputValue: OptionsType<ITagSelect>): void => {
    const lastTag = inputValue[inputValue.length - 1];

    if (lastTag) {
      const lastTagName = lastTag.value ?? '';

      if (lastTag.__isNew__) {
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
    const tagsRequest: (string | undefined)[] = pageTags.map(
      (item) => item.value,
    );

    pageApi
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
      pageApi.getPageTags(currentPage?.id).then((tags) => {
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
        {!isEditMode ? (
          <span className="btn-manage text-primary" onClick={handleManage}>
            manage
          </span>
        ) : (
          <span
            className="btn-done p-2 bg-success text-white"
            onClick={handleDone}
          >
            done
          </span>
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