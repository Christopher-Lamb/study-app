import React from "react";
import "./InfoStorageBox.css";

export default function InfoStorageBox({ key, header, text }) {
  return (
    <div className="storage-box" key={key}>
      <h4>{header}</h4>
      <p>{text}</p>
    </div>
  );
}
