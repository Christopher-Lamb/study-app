import React from "react";
import ContentSelectorCSS from "./ContentSelector.module.css";

export default function ContentSelector({
  createHeader,
  createText,
  cancelBtn,
}) {
  return (
    <div className={ContentSelectorCSS.container}>
      <button onClick={createHeader} className={ContentSelectorCSS.btn}>
        H
      </button>
      <button onClick={createText} className={ContentSelectorCSS.btn}>
        T
      </button>
      <button onClick={cancelBtn} className={ContentSelectorCSS.btn}>
        X
      </button>
      {/* <div className={ContentSelectorCSS.headerBtn}></div> */}
    </div>
  );
}
