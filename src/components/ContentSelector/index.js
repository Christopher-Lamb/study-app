import React, { useRef, useState } from "react";
import CSS from "./ContentSelector.module.css";
import AddText from "../AddText";

export default function ContentSelector({ box, onCancel, onSave }) {
  const [textareaActive, setTextareaActive] = useState(false);
  const [onSelected, setOnSelected] = useState("text");
  const header = useRef();
  const text = useRef();

  const addText = async () => {
    text.current.className = CSS.btnActive;
    header.current.className = CSS.btn;
    setOnSelected("text");
    await setTextareaActive(false);
    await setTextareaActive(true);
  };

  const addHeader = async () => {
    header.current.className = CSS.btnActive;
    text.current.className = CSS.btn;
    setOnSelected("heading");
    await setTextareaActive(false);
    await setTextareaActive(true);
  };

  const cancel = () => {
    text.current.className = CSS.btn;
    header.current.className = CSS.btn;
    setTextareaActive(false);
    onCancel();
  };

  return (
    <div className={CSS.container}>
      <div className={CSS.btnContainer}>
        <p ref={header} onMouseDown={addHeader} className={CSS.btn}>
          Header
        </p>
        <p ref={text} onMouseDown={addText} className={CSS.btn}>
          Text
        </p>
        <p onMouseDown={cancel} className={CSS.btn}>
          Cancel
        </p>
      </div>
      {textareaActive && (
        <AddText boxId={box} type={onSelected} onSave={onSave} />
      )}
    </div>
  );
}
