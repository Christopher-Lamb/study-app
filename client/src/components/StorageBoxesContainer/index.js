import React, { useState, useEffect } from "react";
import InfoStorageBox from "../InfoStorageBox";
import NewBoxPopUp from "../NewBoxPopUp";
import StorageBoxesContainerCSS from "./StorageBoxesContainer.module.css";
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

  const openBoxItem = (itemID) => {
    console.log(itemID);
  };

  return (
    <div className={StorageBoxesContainerCSS.container}>
      <InfoStorageBox>
        <TestingInitLocalStorage
          onInit={setInfoBoxes}
          onDeleteAll={clearLocalStorage}
        />
      </InfoStorageBox>
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
      {informationState
        ? informationState.map((item) => {
            return (
              <InfoStorageBox
                onClick={() => {
                  openBoxItem(item.id);
                }}
                key={item.id}
              >
                <BoxItem info={item} />
              </InfoStorageBox>
            );
          })
        : null}
    </div>
  );
}
