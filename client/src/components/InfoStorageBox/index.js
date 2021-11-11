import React from "react";
import InfoStorageBoxCSS from "./InfoStorageBox.module.css";

export default function InfoStorageBox({ children, onClick }) {
  return (
    <div onClick={onClick} className={InfoStorageBoxCSS.storageBox}>
      {children}
    </div>
  );
}
