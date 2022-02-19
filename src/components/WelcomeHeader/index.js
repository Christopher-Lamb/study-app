import React from "react";
import CSS from "./WelcomeHeader.module.css";

export default function WelcomeHeader() {
  return (
    <div className={CSS.container}>
      <h1 className={CSS.text}>Jot Freely</h1>
    </div>
  );
}
