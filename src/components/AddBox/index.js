import React from "react";
import CSS from "./AddBox.module.css";

export default function AddBox({ onClick }) {
  return (
    <div className={CSS.box} onClick={onClick}>
      <div className={CSS.plus}>
        <div className={CSS.verticalLine}></div>
        <div className={CSS.horizontalLine}></div>
      </div>
    </div>
  );
}
