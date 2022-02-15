import React from "react";
import BoxTitleCSS from "./BoxTitle.module.css";

export default function BoxTitle({ children }) {
  return <p className={BoxTitleCSS.title}>{children}</p>;
}
