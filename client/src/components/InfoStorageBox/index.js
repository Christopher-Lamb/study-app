import React from "react";
import InfoStorageBoxCSS from "./InfoStorageBox.module.css";

export default function InfoStorageBox({ children }) {
  return <div className={InfoStorageBoxCSS.storageBox}>{children}</div>;
}
