import React from "react";
import DelPopUpCSS from "./DeleteBoxPopUp.module.css";

export default function DeleteBoxPopUp({ onClick }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        let verified = window.confirm(
          "Are you sure you want to delete this Box?"
        );
        if (verified) {
          onClick();
        }
      }}
      className={DelPopUpCSS.container}
    >
      <p className={DelPopUpCSS.item}>Delete Box</p>
    </div>
  );
}
