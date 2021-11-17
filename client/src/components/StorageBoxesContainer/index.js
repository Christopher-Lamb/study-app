import React, { useState, useEffect } from "react";
import InfoStorageBox from "../InfoStorageBox";
import NewBoxPopUp from "../NewBoxPopUp";
import StorageBoxesContainerCSS from "./StorageBoxesContainer.module.css";
import InfoStorageBoxCSS from "../InfoStorageBox/InfoStorageBox.module.css";
import TestingInitLocalStorage from "../TestingInitLocalStorage";
import BoxItem from "../BoxItem";

export default function StorageBoxesContainer() {
  const [informationState, setInformationState] = useState([]);
  useEffect(() => {
    setInfoBoxes();
  }, []);

  const [renderAddNewPopUp, setRenderAddNewPopUp] = useState(false);
  // const addStorageBoxToContainer
  const handleAddStorageBtnClick = () => {
    setRenderAddNewPopUp(true);
  };

  const handleExitPopUp = () => {
    setRenderAddNewPopUp(false);
  };
  // Update Information Boxes State and local Storage
  const setInfoBoxes = () => {
    const array = JSON.parse(localStorage.getItem("information"));
    setInformationState(array);
  };

  //Clear LocalStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("information");
    setInfoBoxes();
  };

  return (
    <div className={StorageBoxesContainerCSS.container}>
      <div className={InfoStorageBoxCSS.storageBox}>
        <TestingInitLocalStorage
          onInit={setInfoBoxes}
          onDeleteAll={clearLocalStorage}
        />
      </div>
      <button onClick={handleAddStorageBtnClick}>
        <div className={InfoStorageBoxCSS.storageBox}>
          <div className={StorageBoxesContainerCSS.plus}>
            <div className={StorageBoxesContainerCSS.verticalLine}></div>
            <div className={StorageBoxesContainerCSS.horizontalLine}></div>
          </div>
        </div>
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
      {informationState
        ? informationState.map((item) => {
            return <BoxItem info={item} />;
          })
        : null}
    </div>
  );
}
