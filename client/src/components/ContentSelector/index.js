import React from "react";
import ContentSelectorCSS from "./ContentSelector.module.css";

export default function ContentSelector({
  createHeader,
  createText,
  cancelBtn,
}) {
  return (
    <div className={ContentSelectorCSS.container}>
      <p onClick={createHeader} className={ContentSelectorCSS.btn}>
        Header
      </p>
      <p onClick={createText} className={ContentSelectorCSS.btn}>
        Text
      </p>
      <p onClick={cancelBtn} className={ContentSelectorCSS.btn}>
        Cancel
      </p>
      {/* <div className={ContentSelectorCSS.headerBtn}></div> */}
    </div>
  );
}
