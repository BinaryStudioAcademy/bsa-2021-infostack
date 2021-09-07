import {
  InputGroup,
  FormControl,
  Button,
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { useContext } from 'react';
import Editor, { Plugins } from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { toast } from 'react-toastify';
import { SocketContext } from 'context/socket';
import { useHistory } from 'react-router';
import { RootState } from 'common/types/types';
import { PageEditors } from '../components';
import { AppRoute, PageTitle, SocketEvents } from 'common/enums';
import { pagesActions } from 'store/actions';
import { ConfirmModal } from 'components/common/common';
import { IPageContributor } from 'common/interfaces/pages';
import { CollabEditor } from '../collab-editor/collab-editor';
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
  const socket = useContext(SocketContext);
  const { user } = useAppSelector((state) => state.auth);
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

  const [titleInputValue, setTitleInputValue] = useState(pageTitle || '');
  const [markDownContent, setMarkDownContent] = useState(content);

  const [draftTitleInputValue, setDraftTitleInputValue] = useState(
    draftPageTitle || pageTitle || '',
  );
  const [draftMarkDownContent, setDraftMarkDownContent] = useState(
    draftPageContent || content,
  );

  const [isSaveDraftShown, setSaveDraftShown] = useState(false);
  const [isDeleteDraftShown, setDeleteDraftShown] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCollabModalVisible, setIsCollabModalVisible] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [pageEditors, setPageEditors] = useState<IPageContributor[]>([]);
  const [url, setUrl] = useState('');

  const addEditor = (editors: IPageContributor[], url: string): void => {
    setPageEditors(editors);
    editors.length > 1 && !isLiveMode
      ? setIsCollabModalVisible(true)
      : setIsCollabModalVisible(false);
    setUrl(url);
  };

  useEffect(() => {
    if (user && currentPage) {
      socket.emit(SocketEvents.EDITOR_JOIN, currentPage.id, user);
      socket.on(SocketEvents.EDITOR_JOIN, addEditor);
    }
    return (): void => {
      socket.off(SocketEvents.EDITOR_JOIN, addEditor);
      if (user) {
        socket.emit(SocketEvents.EDITOR_LEFT, currentPage?.id, user.id);
      }
    };
  }, [user]);

  useEffect(() => {
    setSaveDraftShown(true);
    setTitleInputValue(draftTitleInputValue);
    setMarkDownContent(draftMarkDownContent);

    const isTitleNotChanged = draftTitleInputValue === pageTitle;
    const isDraftTitleNotChanged = draftTitleInputValue === draftPageTitle;

    const checkDraftTitle = isTitleNotChanged || isDraftTitleNotChanged;

    const isContentNotChanged = draftMarkDownContent === content;
    const isDraftContentNotChanged = draftMarkDownContent === draftPageContent;

    const checkDraftContent = isContentNotChanged || isDraftContentNotChanged;

    if (checkDraftTitle && checkDraftContent) {
      setSaveDraftShown(false);
      return;
    } else {
      const timeoutId = setTimeout(() => {
        handleAutosaveAsDraft();
        setDeleteDraftShown(true);
      }, 10000);

      return (): void => clearTimeout(timeoutId);
    }
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

  const onCancel = (): void => {
    if (isSaveDraftShown) {
      handleSaveAsDraftConfirm();
    }
    handleCancel();
  };

  const handleCancel = (): void => {
    history.push(replaceIdParam(AppRoute.PAGE, paramsId || ''));
  };

  const showWarningOnTitle = (title: string): void => {
    if (title?.trim().length === 0) {
      toast.warning('Title could not be empty');
      return;
    }
    toast.warning(
      `Title could not be so long. Please delete ${
        title && title?.length - PageTitle.MAX_PAGE_TITLE_LENGTH
      } symbol(s)`,
    );
  };

  const isTitleLessThanMaxLength = (title: string): boolean => {
    return title.trim().length <= PageTitle.MAX_PAGE_TITLE_LENGTH;
  };

  const handleSaveConfirm = (): void => {
    if (titleInputValue && isTitleLessThanMaxLength(titleInputValue)) {
      dispatch(
        pagesActions.editPageContent({
          pageId: paramsId,
          title: titleInputValue.trim(),
          content: markDownContent?.length === 0 ? ' ' : markDownContent,
        }),
      )
        .unwrap()
        .then(handleCancel);
      dispatch(pagesActions.deleteDraft(paramsId));
      return;
    }
    showWarningOnTitle(titleInputValue);
  };

  const handleSaveAsDraftConfirm = (): void => {
    if (
      draftTitleInputValue &&
      isTitleLessThanMaxLength(draftTitleInputValue)
    ) {
      dispatch(
        pagesActions.editDraft({
          pageId: paramsId,
          title: draftTitleInputValue.trim(),
          content:
            draftMarkDownContent?.length === 0 ? ' ' : draftMarkDownContent,
        }),
      )
        .unwrap()
        .then(handleCancel);
      return;
    }
    showWarningOnTitle(draftTitleInputValue);
  };

  const handleDeleteDraft = async (): Promise<void> => {
    if (isDeleteDraftShown) {
      await dispatch(pagesActions.deleteDraft(paramsId));
      toast.info('Draft has been deleted successfully.', {
        closeOnClick: false,
        pauseOnHover: true,
      });

      setDraftTitleInputValue(pageTitle || '');
      setDraftMarkDownContent(content);

      setDeleteDraftShown(false);
      handleDeleteCancel();
    }
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteModalVisible(false);
  };

  const handleUsualMode = (): void => {
    setIsCollabModalVisible(false);
    setIsLiveMode(false);
    socket.emit(SocketEvents.EDITOR_LEFT, currentPage?.id, user?.id);
  };

  const handleLifeMode = (): void => {
    setIsCollabModalVisible(false);
    setIsLiveMode(true);
  };

  const onDraftDelete = (): void => {
    setIsDeleteModalVisible(true);
  };

  const handleCollabSaveConfirm = (title: string, content: string): void => {
    if (title && isTitleLessThanMaxLength(title)) {
      dispatch(
        pagesActions.editPageContent({
          pageId: paramsId,
          title: title.trim(),
          content: content?.length === 0 ? ' ' : content,
        }),
      )
        .unwrap()
        .then(handleCancel);
      return;
    }
    showWarningOnTitle(titleInputValue);
  };

  const handleAutosaveAsDraft = (): void => {
    if (
      draftTitleInputValue &&
      isTitleLessThanMaxLength(draftTitleInputValue)
    ) {
      dispatch(
        pagesActions.editDraft({
          pageId: paramsId,
          title: draftTitleInputValue.trim(),
          content:
            draftMarkDownContent?.length === 0 ? ' ' : draftMarkDownContent,
        }),
      )
        .unwrap()
        .then(() => toast.info('Draft has been autosaved'));
      return;
    }
    showWarningOnTitle(draftTitleInputValue);
  };

  return (
    <>
      <div className="p-4">
        {isLiveMode ? (
          <>
            <PageEditors editors={pageEditors} />
            {user ? (
              <CollabEditor
                userName={user.fullName}
                title={draftTitleInputValue}
                content={draftMarkDownContent}
                handleSaveConfirm={handleCollabSaveConfirm}
                handleCancel={onCancel}
                url={url}
              />
            ) : null}
          </>
        ) : (
          <>
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
                <Card
                  border="light"
                  className={getAllowedClasses(styles.content)}
                >
                  <Editor
                    value={draftMarkDownContent}
                    onChange={({ text }): void => setDraftMarkDownContent(text)}
                    onImageUpload={onImageUpload}
                    renderHTML={(text): JSX.Element => (
                      <ReactMarkdown remarkPlugins={[gfm]}>
                        {text}
                      </ReactMarkdown>
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
                {isDeleteDraftShown ? (
                  <Button
                    onClick={onDraftDelete}
                    variant="danger"
                    size="sm"
                    className="me-3"
                  >
                    Delete Draft
                  </Button>
                ) : null}
                <Button onClick={onCancel} variant="secondary" size="sm">
                  Cancel
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
      <ConfirmModal
        title="Delete confirmation"
        showModal={isDeleteModalVisible}
        modalText="Are you sure you want to delete the draft?"
        confirmButton={{
          text: 'Delete',
          onClick: handleDeleteDraft,
          variant: 'danger',
        }}
        cancelButton={{
          text: 'Close',
          onClick: handleDeleteCancel,
        }}
      />
      <ConfirmModal
        title="Confirmation"
        showModal={isCollabModalVisible}
        modalText="Choose the mode:"
        confirmButton={{
          text: 'Usual',
          onClick: handleUsualMode,
        }}
        cancelButton={{
          text: 'Live',
          onClick: handleLifeMode,
        }}
      />
    </>
  );
};
