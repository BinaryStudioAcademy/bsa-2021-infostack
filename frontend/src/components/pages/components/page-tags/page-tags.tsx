/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { Badge, Button, Card } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { CSSObject } from '@emotion/serialize';
import { OptionsType, components } from 'react-select';
import { ITagSelect } from 'common/interfaces/tag';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { pageApi, tagApi } from 'services';
import { tagActions } from 'store/tags';
import { PermissionType } from 'common/enums/enums';
import { TagType } from 'common/enums/enums';
import './page-tags.scss';

const PageTags: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const [allTags, setAllTags] = useState<ITagSelect[]>([]);
  const [pageTags, setPageTags] = useState<ITagSelect[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const isCanManage = currentPage?.permission !== PermissionType.READ;

  const { Option } = components;
  const CustomSelectOption = (props: any): JSX.Element => (
    <Option {...props}>
      {props.data.label}
      <i className={`${props.data.icon} ms-2`} />
    </Option>
  );

  const CustomSelectMultiValueLabel = (props: any): JSX.Element => (
    <div>
      {props.data.label}
      <span className="input-select-icon">
        <i className={`${props.data.icon} ms-2`} />
      </span>
    </div>
  );

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

  const PageTagSelect: React.FC = () => {
    return (
      <CreatableSelect
        isMulti
        onChange={handleInputChange}
        value={pageTags}
        options={allTags}
        components={{
          Option: CustomSelectOption,
          MultiValueLabel: CustomSelectMultiValueLabel,
        }}
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
            fontSize: '1rem',
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
        {isCanManage &&
          (!isEditMode ? (
            <i className="bi bi-pencil tags-edit" onClick={handleManage}></i>
          ) : (
            <Button
              variant="success"
              className="btn-done p-1 text-white"
              onClick={handleDone}
            >
              done
            </Button>
          ))}
      </Card.Header>
      <Card.Body>
        {!isEditMode ? (
          pageTags?.length ? (
            <div className="d-flex align-items-start flex-wrap">
              {pageTags.map(({ id, name, type }) => (
                <Badge pill text="primary" className="tag-badge" key={id}>
                  {name}
                  {type === TagType.GITHUB && (
                    <i className="bi bi-github ms-2" />
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-warning">no tags</span>
          )
        ) : (
          <PageTagSelect />
        )}
      </Card.Body>
    </Card>
  );
};

export default PageTags;
