import 'react-markdown-editor-lite/lib/index.css';
import {
  InputGroup,
  FormControl,
  Button,
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import Editor, { Plugins } from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { RootState } from 'common/types/types';
import { AppRoute, PageTitle } from 'common/enums/enums';
import { pagesActions } from 'store/actions';
import {
  useState,
  useAppDispatch,
  useAppSelector,
  useParams,
  useRef,
  useEffect,
} from 'hooks/hooks';
import { replaceIdParam, getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const ContentEditor: React.FC = () => {
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  // const pageTitle = currentPage?.pageContents[0].title;
  // const content = currentPage?.pageContents[0].content;
  const titleInputValue = currentPage?.pageContents[0].title;
  const markDownContent = currentPage?.pageContents[0].content;

  const draftPageTitle = currentPage?.draft?.title;
  const draftPageContent = currentPage?.draft?.content;

  const paramsId = useParams<{ id: string }>().id;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const editorRef = useRef(null);

  Editor.unuse(Plugins.FontUnderline);

  if (!currentPage) {
    history.push(replaceIdParam(AppRoute.PAGE, paramsId || ''));
  }

  // const [titleInputValue, setTitleInputValue] = useState(pageTitle);
  // const [markDownContent, setMarkDownContent] = useState(content);

  const [draftTitleInputValue, setDraftTitleInputValue] =
    useState(draftPageTitle);
  const [draftMarkDownContent, setDraftMarkDownContent] =
    useState(draftPageContent);

  useEffect(() => {
    if (draftTitleInputValue === titleInputValue) {
      setDraftTitleInputValue(undefined);
    }
  }, [draftTitleInputValue]);

  useEffect(() => {
    if (draftMarkDownContent === markDownContent) {
      setDraftMarkDownContent(undefined);
    }
  }, [draftMarkDownContent]);

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // setTitleInputValue(target.value);
    setDraftTitleInputValue(target.value);
  };

  const onImageUpload = (
    file: Blob,
  ): Promise<string | ArrayBuffer | null | undefined> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data): void => {
        if (data) {
          resolve(data?.target?.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCancel = (): void => {
    history.push(replaceIdParam(AppRoute.PAGE, paramsId || ''));
  };

  const handleSaveConfirm = (): void => {
    if (
      titleInputValue &&
      titleInputValue?.trim().length <= PageTitle.MAX_PAGE_TITLE_LENGTH
    ) {
      if (markDownContent || titleInputValue) {
        dispatch(
          pagesActions.editPageContent({
            pageId: paramsId,
            title: titleInputValue.trim(),
            content: markDownContent?.length === 0 ? ' ' : markDownContent,
          }),
        )
          .unwrap()
          .then(handleCancel);
      }
    } else if (titleInputValue?.trim().length === 0) {
      toast.warning('Title could not be empty');
    } else {
      toast.warning(
        `Title could not be so long. Please delete ${
          titleInputValue &&
          titleInputValue?.length - PageTitle.MAX_PAGE_TITLE_LENGTH
        } symbol(s)`,
      );
    }
  };

  const handleSaveAsDraftConfirm = (): void => {
    if (draftTitleInputValue && draftTitleInputValue?.trim().length !== 0) {
      if (draftMarkDownContent || draftTitleInputValue) {
        dispatch(
          pagesActions.editPageContent({
            pageId: paramsId,
            title: draftTitleInputValue.trim(),
            content:
              draftMarkDownContent?.length === 0 ? ' ' : draftMarkDownContent,
          }),
        )
          .unwrap()
          .then(handleCancel);
      }
    }
  };

  const handleDeleteDraft = (): void => {
    console.info('@to-do delete draft');
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between">
          <InputGroup>
            {/* <FormControl value={titleInputValue} onChange={onInputChange} /> */}
            <FormControl
              value={draftTitleInputValue || titleInputValue}
              onChange={onInputChange}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card border="light" className={getAllowedClasses(styles.content)}>
            <Editor
              // value={markDownContent}
              // onChange={({ text }): void => setMarkDownContent(text)}
              value={draftMarkDownContent}
              onChange={({ text }): void => setDraftMarkDownContent(text)}
              onImageUpload={onImageUpload}
              renderHTML={(text): JSX.Element => (
                <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>
              )}
              ref={editorRef}
            />
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Button
            onClick={handleSaveConfirm}
            variant="success"
            size="sm"
            className="me-3"
          >
            Save
          </Button>
          {draftTitleInputValue || draftMarkDownContent ? (
            <Button
              onClick={handleSaveAsDraftConfirm}
              variant="success"
              size="sm"
              className="me-3"
            >
              Save as Draft
            </Button>
          ) : null}
          <Button
            onClick={handleDeleteDraft}
            variant="danger"
            size="sm"
            className="me-3"
          >
            Delete Draft
          </Button>
          <Button onClick={handleCancel} variant="warning" size="sm">
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
};
