import React, { useState, useEffect } from "react";
import NewBoxPopUp from "../NewBoxPopUp";
import StorageBoxesContainerCSS from "./StorageBoxesContainer.module.css";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import TestingInitLocalStorage from "../TestingInitLocalStorage";
import BoxItem from "../BoxItem";
import information from "../../Information.json";

export default function StorageBoxesContainer() {
  //Shitty Name
  const [boxesState, setBoxesState] = useState([]);
  const [boxesComponentState, setBoxesComponentState] = useState([]);
  const [renderAddNewPopUp, setRenderAddNewPopUp] = useState(false);

  useEffect(() => {
    setStorageBoxes();
  }, []);

  useEffect(() => {
    console.log("Change BoxState");
    getComponents();
  }, [boxesState]);

  const initLocalStorage = () => {
    localStorage.setItem("StorageBoxes", JSON.stringify(information));
    setStorageBoxes();
  };

  const getComponents = () => {
    if (boxesState !== null) {
      const components = boxesState.map((box, i) => {
        return (
          <BoxItem key={box.boxId} content={box} deleteBox={handleBoxDelete} />
        );
      });
      console.log(components);
      setBoxesComponentState(components);
    }
  };
  // const addStorageBoxToContainer
  const handleAddStorageBtnClick = () => {
    setRenderAddNewPopUp(true);
  };

  const handleExitPopUp = () => {
    setRenderAddNewPopUp(false);
  };
  // Update Information Boxes State and local Storage
  const setStorageBoxes = () => {
    const array = JSON.parse(localStorage.getItem("StorageBoxes"));

    setBoxesState(array);
    getComponents();
  };

  //Clear LocalStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("StorageBoxes");
    setBoxesState([]);
  };

  const handleBoxDelete = (delBoxId) => {
    // console.log(delBoxId);
    //Handles DB interaction
    // const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));
    const updatedStorageBoxes = boxesState.filter((box) => {
      if (box.boxId === delBoxId.boxId) {
        return;
        // console.log("Box.BoxId if", box.boxId);
      } else {
        // console.log("Box.BoxId else", box.boxId);
        return box;
      }
    });

    setBoxesState(updatedStorageBoxes);
    getComponents();

    localStorage.setItem("StorageBoxes", JSON.stringify(updatedStorageBoxes));
  };

  return (
    <div className={StorageBoxesContainerCSS.container}>
      <div className={BoxItemCSS.storageBox}>
        <TestingInitLocalStorage onInit={initLocalStorage} />
      </div>
      {/* Add Storage Box */}
      <button onClick={handleAddStorageBtnClick}>
        <div className={BoxItemCSS.storageBox}>
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
            setStorageBoxes();
            handleExitPopUp();
          }}
        />
      )}
      {/*Displays ALl the Stored Boxes ^^^*/}
      {boxesComponentState}
    </div>
  );
}
