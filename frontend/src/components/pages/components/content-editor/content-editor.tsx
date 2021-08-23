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

  const pageTitle = currentPage?.pageContents[0].title;
  const content = currentPage?.pageContents[0].content;

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

  const [titleInputValue, setTitleInputValue] = useState(pageTitle);
  const [markDownContent, setMarkDownContent] = useState(content);

  const [draftTitleInputValue, setDraftTitleInputValue] = useState(
    draftPageTitle || pageTitle,
  );
  const [draftMarkDownContent, setDraftMarkDownContent] = useState(
    draftPageContent || content,
  );

  const [isSaveDraftShown, setSaveDraftShown] = useState(false);
  const [isDeleteDraftShown, setDeleteDraftShown] = useState(false);

  useEffect(() => {
    const checkDraftTitle =
      draftTitleInputValue === pageTitle ||
      draftTitleInputValue === draftPageTitle;
    const checkDraftContent =
      draftMarkDownContent === content ||
      draftMarkDownContent === draftPageContent;

    if (checkDraftTitle && checkDraftContent) {
      setSaveDraftShown(false);
      return;
    }
    setSaveDraftShown(true);
  }, [titleInputValue, markDownContent]);

  useEffect(() => {
    setTitleInputValue(draftTitleInputValue);
    setMarkDownContent(draftMarkDownContent);
  }, [draftTitleInputValue, draftMarkDownContent]);

  useEffect(() => {
    if (draftPageTitle || draftPageContent) {
      setDeleteDraftShown(true);
    }
  }, [draftPageTitle, draftPageContent]);

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
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
      handleDeleteDraft();
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
    if (
      draftTitleInputValue &&
      draftTitleInputValue?.trim().length <= PageTitle.MAX_PAGE_TITLE_LENGTH
    ) {
      dispatch(
        pagesActions.editDraft({
          pageId: paramsId,
          title: draftTitleInputValue.trim(),
          content:
            !draftMarkDownContent || draftMarkDownContent.length === 0
              ? ' '
              : draftMarkDownContent,
        }),
      )
        .unwrap()
        .then(handleCancel);
    } else if (draftTitleInputValue?.trim().length === 0) {
      toast.warning('Title could not be empty');
    } else {
      toast.warning(
        `Title could not be so long. Please delete ${
          draftTitleInputValue &&
          draftTitleInputValue?.length - PageTitle.MAX_PAGE_TITLE_LENGTH
        } symbol(s)`,
      );
    }
  };

  const handleDeleteDraft = async (): Promise<void> => {
    if (isDeleteDraftShown) {
      history.push(replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || ''));
      await dispatch(pagesActions.deleteDraft(paramsId));
      toast.info('Draft has been deleted successfully.', {
        closeOnClick: false,
        pauseOnHover: true,
      });

      setDraftTitleInputValue(pageTitle);
      setDraftMarkDownContent(content);

      setDeleteDraftShown(false);
      setSaveDraftShown(false);
    }
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between">
          <InputGroup>
            <FormControl
              value={draftTitleInputValue}
              onChange={onInputChange}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card border="light" className={getAllowedClasses(styles.content)}>
            <Editor
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
          {/* {draftTitleInputValue || draftMarkDownContent ? ( */}
          {isSaveDraftShown ? (
            <Button
              onClick={handleSaveAsDraftConfirm}
              variant="success"
              size="sm"
              className="me-3"
            >
              Save as Draft
            </Button>
          ) : null}
          {/* {draftPageTitle || draftPageContent ? ( */}
          {isDeleteDraftShown ? (
            <Button
              onClick={handleDeleteDraft}
              variant="danger"
              size="sm"
              className="me-3"
            >
              Delete Draft
            </Button>
          ) : null}
          <Button onClick={handleCancel} variant="warning" size="sm">
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
};
