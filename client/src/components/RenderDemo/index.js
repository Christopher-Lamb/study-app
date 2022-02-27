import React from "react";
import CSS from "./RenderDemo.module.css";

export default function RenderDemo({ onClick }) {
  return (
    <div onClick={onClick} className={CSS.btn}>
      Render Demo
    </div>
  );
}
