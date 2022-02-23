import React, { useRef, useState } from "react";
import CSS from "./ContentSelector.module.css";

export default function ContentSelector({ onSelected, onCancel }) {
  const header = useRef();
  const text = useRef();

  const addText = () => {
    text.current.className = CSS.btnActive;
    header.current.className = CSS.btn;
    onSelected("text");
  };

  const addHeader = () => {
    header.current.className = CSS.btnActive;
    text.current.className = CSS.btn;
    onSelected("heading");
  };

  const cancel = () => {
    text.current.className = CSS.btn;
    header.current.className = CSS.btn;
    onCancel();
  };

  const renderEditngSpace = () => {};

  return (
    <div className={CSS.container}>
      <p ref={header} onMouseDown={addHeader} className={CSS.btn}>
        Header
      </p>
      <p ref={text} onMouseDown={addText} className={CSS.btn}>
        Text
      </p>
      <p onMouseDown={cancel} className={CSS.btn}>
        Cancel
      </p>
      {/* <div className={ContentSelectorCSS.headerBtn}></div> */}
    </div>
  );
}
