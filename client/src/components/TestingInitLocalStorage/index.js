import React from "react";
import TestingModuleCSS from "./Testing.module.css";
import information from "../../Information.json";

export default function TestingInitLocalStorage({ onInit, onDeleteAll }) {
  //Init LocalStorage
  const initLocalStorage = () => {
    localStorage.setItem("information", JSON.stringify(information));
  };
  return (
    <>
      <button
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
      </button>
    </>
  );
}
