import {
  InputGroup,
  FormControl,
  Button,
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import * as Y from 'yjs';
import Quill from 'quill';
import { useQuill } from 'react-quilljs';
import QuillCursors from 'quill-cursors';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill';
import TurndownService from 'turndown';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { useState, useEffect, useParams } from 'hooks/hooks';
import { replaceIdParam, getAllowedClasses } from 'helpers/helpers';
import { AppRoute } from 'common/enums';
// import { env } from '';

import 'quill/dist/quill.snow.css';
import styles from './styles.module.scss';

// const POSITION = 0;

interface Props {
  userName: string | undefined;
  title: string | undefined;
  content: string | undefined;
  handleSaveConfirm(
    title: string | undefined,
    content: string | undefined,
  ): void;
  handleCancel(): void;
}

export const CollabEditor: React.FC<Props> = ({
  userName,
  title,
  content,
  handleSaveConfirm,
  handleCancel,
}) => {
  const paramsId = useParams<{ id: string }>().id;

  const [titleInput, setTitleInput] = useState(title);
  const [contentInput, setContentInput] = useState('');
  const [provider, setProvider] = useState<WebrtcProvider>();

  Quill.register('modules/cursors', QuillCursors);

  const { quill, quillRef } = useQuill({
    modules: {
      cursors: {
        transformOnTextChange: true,
      },
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      // syntax: true,
      // table: true,
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['image', 'link'],
      ],
    },
    formats: [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'code-block',
    ],
  });

  const ydoc = new Y.Doc();

  // useEffect(() => {
  // 	if (quill) {
  // 		setProvider();
  // 	}
  // }, []);
  // useEffect(() => {
  //   const provider = new WebsocketProvider("wss://yjs-react-example.herokuapp.com/");// change to 'ws://localhost:3000' for local development
  //   const ydocument = provider.get("textarea");
  //   const type = ydocument.define("textarea", YText);
  //   new QuillBinding(type, quillRef);
  // }, []);

  // const clearEditor = (): void => {
  //   const lenght = quill?.getLength() || 0;
  //   if (quill && lenght > 0) {
  //     quill.deleteText(POSITION, quill?.getLength());
  //   }
  //   quillRef.current.value = '';
  // };

  const onSave = (): void => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(contentInput);
    handleSaveConfirm(titleInput, markdown);
    // clearEditor();
  };

  const onCancel = (): void => {
    if (provider) {
      provider.destroy();
    }
    // clearEditor();
    handleCancel();
  };

  useEffect(() => {
    if (quill) {
      const url = replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || '');
      console.info(url);
      const provider = new WebrtcProvider(`wss://localhost:3000${url}`, ydoc);

      setProvider(provider);

      // const url = replaceIdParam(AppRoute.CONTENT_SETTING, paramsId || '');
      // setProvider(new WebrtcProvider('wss://localhost:3000/page/f2868acd-09ec-4661-8bf8-ebf78e51e6c5/editor', ydoc));

      // const provider = new WebrtcProvider(
      //   'wss://localhost:3000/page/f2868acd-09ec-4661-8bf8-ebf78e51e6c5/editor',
      //   ydoc,
      // );

      provider.connect();
      const yQuillTextYtype = ydoc.getText('quill');
      new QuillBinding(yQuillTextYtype, quill, provider?.awareness);

      provider.awareness.setLocalStateField('user', {
        name: userName,
        color: 'blue',
      });

      if (quill.getLength() < 2) {
        const md = new MarkdownIt();
        const result = md.render(content || '');
        quill.clipboard.dangerouslyPasteHTML(result);
      }

      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        setContentInput(html);
      });
    }
  }, [quill]);

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setTitleInput(target.value);
  };

  return (
    <>
      <Row className="mb-4">
        <Col className="d-flex justify-content-between">
          <InputGroup>
            <FormControl value={titleInput} onChange={onInputChange} />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card border="light" className={getAllowedClasses(styles.content)}>
            <div className={getAllowedClasses(styles.editor)}>
              <div ref={quillRef} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Button onClick={onSave} variant="success" size="sm" className="me-3">
            Save
          </Button>
          <Button onClick={onCancel} variant="warning" size="sm">
            Cancel
          </Button>
        </Col>
      </Row>
    </>
  );
};
