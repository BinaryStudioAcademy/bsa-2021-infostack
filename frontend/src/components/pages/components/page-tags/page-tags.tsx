import { ITagSelect } from 'common/interfaces/tag';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { Badge, Button, Card } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { CSSObject } from '@emotion/serialize';
import { OptionsType } from 'react-select';
import { PageApi, TagApi } from 'services';
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
    <Card border="light" className="card">
      <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
        Tags
        {!isEditMode ? (
          <span className="btn-manage text-success" onClick={handleManage}>
            manage
          </span>
        ) : (
          <Button
            variant="success"
            className="btn-done p-1 text-white"
            onClick={handleDone}
          >
            done
          </Button>
        )}
      </Card.Header>
      {/* <Card.Title className="d-flex justify-content-between align-items-center h6 text-secondary tags-title">
      </Card.Title> */}
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
    </Card>
  );
};

export default PageTags;
