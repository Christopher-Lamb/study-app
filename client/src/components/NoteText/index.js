import React, { useRef } from "react";
import NoteTextCSS from "./NoteText.module.css";

export default function NoteText({ text, elementType }) {
  let element = useRef();
  if (elementType === "header") {
    element.current = (
      <>
        <h1 className={NoteTextCSS.heading}>{text}</h1>
      </>
    );
  } else if ((elementType = "text")) {
    element.current = (
      <>
        <p className={NoteTextCSS.text}> {text}</p>
      </>
    );
  }
  return <div className={NoteTextCSS.container} >{element.current}</div>;
}
