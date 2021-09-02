import React, { useEffect } from 'react';
import * as Y from 'yjs';
// import Quill from 'quill';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme

import { WebsocketProvider } from 'y-websocket';
// import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill';

export const CollabEditor: React.FC = () => {
  const { quill, quillRef } = useQuill();
  // const { quillRef } = useQuill({ modules: { cursors: true } });
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

  useEffect(() => {
    console.info(quillRef.current);
    if (quill) {
      const provider = new WebsocketProvider(
        'wss://localhost:3000/page/c261d359-0d37-4b35-ac6d-19f59506707a/editor',
        'quill',
        ydoc,
      );
      provider.connect();
      const yQuillTextYtype = ydoc.getText('quill');
      new QuillBinding(yQuillTextYtype, quill, provider.awareness);
      // const handleObserve = e => {
      // 	if (quill && e.delta[0]) {
      // 		const text = e.delta[0].insert;
      // 		quill.clipboard.dangerouslyPasteHTML(props.text);
      // 		yQuillTextYtype.unobserve(handleObserve);
      // 	}
      // }
      // yQuillTextYtype.observe(handleObserve);
    }
  }, [quill]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
    // <div ref={quillRef}/>
  );
};

// import React from 'react';
// import * as Y from 'yjs';
// import Quill from 'quill';
// import { QuillBinding } from 'y-quill';
// import { WebrtcProvider } from 'y-webrtc';

// export const CollabEditor: React.FC = () => {
//   // const editorContainer = React.useRef<HTMLDivElement>(null);
//   const editorContainer = React.createRef<HTMLDivElement>();

//   React.useEffect(() => {
//     // const div = editorContainer.current as Element;
//   const quill = new Quill(editorContainer.current?.id || '', {
//     modules: {
//       cursors: true,
//       toolbar: [
//         [{ header: [1, 2, false] }],
//         ['bold', 'italic', 'underline'],
//         ['image', 'code-block'],
//       ],
//       history: {
//         userOnly: true,
//       },
//     },
//     theme: 'snow',
//   });

//   const ydoc = new Y.Doc();
//   const provider = new WebrtcProvider('quill-demo-room', ydoc);
//   const ytext = ydoc.getText('quill');
//   new QuillBinding(ytext, quill, provider.awareness);
// }, []);

//     return (
//       <>
//         {/* <div ref={editorContainer}></div> */}
//         <div ref={editorContainer}></div>
//         {/* <div id="editor"></div> */}
//       </>
//     );
// };

// import React from 'react';
// import * as Y from 'yjs';
// import ReactQuill, { Quill } from 'react-quill';
// // import { YText } from "yjs/types/YText";
// import { WebsocketProvider } from 'y-websocket';
// import { QuillBinding } from 'y-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Button } from 'react-bootstrap';

// export const CollabEditor: React.FC = () => {
//   let quillRef: Quill | null | undefined = null;
//   const [reactQuillRef, setReactQuillRef] = React.useState<ReactQuill | null>(null);
//   // const reactQuillRef = React.createRef<ReactQuill>();
//   // let reactQuillRef: ReactQuill | null = null;

//   const [value, setValue] = React.useState('');

//   const ydoc = new Y.Doc();
//   const ytext = ydoc.getText('textarea');

//   React.useEffect(() => {
//     // attachQuillRefs();
//     console.info(ytext, value, reactQuillRef);
//     const provider = new WebsocketProvider('wss://localhost:3000/page/c261d359-0d37-4b35-ac6d-19f59506707a/editor', 'room', ydoc);// change to 'ws://localhost:3000' for local development
//     // const ydocument = provider.get("textarea");
//     // const type = ydocument.define("textarea", YText);
//     quillRef = reactQuillRef?.getEditor();
//     new QuillBinding(ytext, quillRef, provider.awareness);
//   }, []);

//   // const attachQuillRefs = (): void => {
//   //   if (reactQuillRef) {
//   //   // if (typeof reactQuillRef.getEditor !== 'function') return;
//   //   quillRef = reactQuillRef.current?.getEditor();
//   //   }
//   // };

//   // const insertText = (): void => {
//   //   if (quillRef) {
//   //     const range = quillRef.getSelection();
//   //     const position = range ? range.index : 0;
//   //     quillRef.insertText(position, 'Hello, World! ');
//   //   }
//   // };

//   const setNewValue = (content: string): void => {
//     setValue(content);
//   };

//   return (
//     <div>
//         <ReactQuill
//           ref={(el): void => { setReactQuillRef(el); }}
//           // ref={(el): void => { reactQuillRef = el; }}
//           // ref={reactQuillRef}
//           value={value}
//           onChange={setNewValue}
//           theme={'snow'} />
//         <Button>Insert Hello World! in Text</Button>
//         {/* <Button onClick={insertText}>Insert Hello World! in Text</Button> */}
//       </div>
//   );
// };
