import React, { useState, useEffect } from "react";
import InfoStorageBox from "../InfoStorageBox";
import NewBoxPopUp from "../NewBoxPopUp";
import StorageBoxesContainerCSS from "./StorageBoxesContainer.module.css";
import information from "../../Information.json";

export default function StorageBoxesContainer() {
  const [informationState, setInformationState] = useState([]);
  useEffect(() => {
    initLocalStorage();
    setInfoBoxes();
  }, []);
  //Init LocalStorage
  const initLocalStorage = () => {
    localStorage.setItem("information", JSON.stringify(information));
  };

  const [renderAddNewPopUp, setRenderAddNewPopUp] = useState(false);
  // const addStorageBoxToContainer
  const handleAddStorageBtnClick = () => {
    setRenderAddNewPopUp(true);
  };

  const handleExitPopUp = () => {
    setRenderAddNewPopUp(false);
  };

  const setInfoBoxes = () => {
    const array = JSON.parse(localStorage.getItem("information"));
    setInformationState(array);
  };

  return (
    <div className={StorageBoxesContainerCSS.container}>
      <button onClick={handleAddStorageBtnClick}>
        <InfoStorageBox>
          <div className={StorageBoxesContainerCSS.plus}>
            <div className={StorageBoxesContainerCSS.verticalLine}></div>
            <div className={StorageBoxesContainerCSS.horizontalLine}></div>
          </div>
        </InfoStorageBox>
      </button>
      {renderAddNewPopUp && (
        <NewBoxPopUp
          onExitPopUp={handleExitPopUp}
          onCreate={() => {
            setInfoBoxes();
            handleExitPopUp();
          }}
        />
      )}
      {/*This will be a state trigger ^^^*/}
      {informationState.map((info) => {
        return (
          <InfoStorageBox key={info.id}>
            <h1>{info.title}</h1>
            <p>{info.text}</p>
          </InfoStorageBox>
        );
      })}
    </div>
  );
}
