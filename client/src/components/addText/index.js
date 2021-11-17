import React from "react";
import addTextCSS from "./addText.module.css";

export default function ItemText() {
  return (
    <div className={addTextCSS.container}>
      <textarea></textarea>
    </div>
  );
}
