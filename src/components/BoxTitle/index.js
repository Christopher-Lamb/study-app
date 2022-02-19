import React from "react";
import BoxTitleCSS from "./BoxTitle.module.css";

export default function BoxTitle({ children, ref }) {
  return <p className={BoxTitleCSS.title}>{children}</p>;
}
