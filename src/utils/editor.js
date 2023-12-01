import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  placeholder:"Tell your story..",
  uploader: { insertImageAsBase64URI: true },
};
const editorConfig = {
  placeholder:"Tell your story..",
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",
  uploader: {
    insertImageAsBase64URI: true
  },
  width: '100%',
  height: '90%'
};
const TextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      styles={{"width":"100%"}}
      ref={editor}
     value={initialValue}
      config={editorConfig}
     onChange={(newContent) => getValue(newContent)}
   />
  );
};

export default TextEditor;