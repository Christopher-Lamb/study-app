import React from "react";
import TestingModuleCSS from "./Testing.module.css";
import information from "../../Information.json";

export default function TestingInitLocalStorage({ onInit, onDeleteAll }) {
  //Init LocalStorage
  const initLocalStorage = () => {
    localStorage.setItem("StorageBoxes", JSON.stringify(information));
  };
  return (
    <>
      <button onClick={onInit} className={TestingModuleCSS.render_box}>
        <strong>RenderDemo</strong>
      </button>
      <p className={TestingModuleCSS.explaination}>
        This will delete any currently saved boxes
      </p>
      {/* <button
        onClick={() => {
          initLocalStorage();
          onInit();
        }}
        className={TestingModuleCSS.text}
      >
        RESET LOCAL STORAGE
      </button>
      <button onClick={onDeleteAll} className={TestingModuleCSS.text}>
        Delete All
      </button> */}
    </>
  );
}
