import React, { useState, useEffect, useRef } from "react";
import NewBoxPopUp from "../NewBoxPopUp";
import StorageBoxesContainerCSS from "./StorageBoxesContainer.module.css";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
import TestingInitLocalStorage from "../TestingInitLocalStorage";
import BoxItem from "../BoxItem";
import information from "../../Information.json";
import AddBox from "../AddBox";
import storageFunct from "../../utils/localStorageFunct";

export default function StorageBoxesContainer() {
  //Shitty Name
  const [boxesState, setBoxesState] = useState([]);
  const [boxesComponentState, setBoxesComponentState] = useState([]);
  const [renderAddNewPopUp, setRenderAddNewPopUp] = useState(false);
  const demoRendered = useRef(false);

  useEffect(() => {
    setStorageBoxes();
  }, []);

  // useEffect(() => {
  //   getComponents();
  // }, [boxesState]);

  const initLocalStorage = () => {
    storageFunct.initDemo();
    setStorageBoxes();
  };

  const getComponents = () => {
    console.log(boxesState);
    const local = storageFunct.getAllStorage();
    console.log(local.length);
    let ReactComponents = [];
    if (local.length !== 0) {
      const components = boxesState.map((box, i) => {
        return (
          <BoxItem key={box.boxId} content={box} deleteBox={handleBoxDelete} />
        );
      });
      ReactComponents = components;
      // setBoxesComponentState(components);
    } else {
      //If local = 0
      if (demoRendered.current === false) {
        demoRendered.current = true;
        initLocalStorage();
      }
    }
    return ReactComponents;
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
    const array = storageFunct.getAllStorage();
    setBoxesState(array);
    // getComponents();
  };

  //Clear LocalStorage
  const clearLocalStorage = () => {
    storageFunct.removeAllStorage();
    setBoxesState([]);
  };

  const handleBoxDelete = (delBoxId) => {
    // const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));
    const updatedBoxes = storageFunct.delBox(delBoxId);
    setBoxesState(updatedBoxes);
    getComponents();
  };

  return (
    <div className={StorageBoxesContainerCSS.container}>
      {/* Add Storage Box */}
      <AddBox onClick={handleAddStorageBtnClick} />
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
      {getComponents()}
    </div>
  );
}
