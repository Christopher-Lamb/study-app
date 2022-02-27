import React, { useState, useEffect, useRef } from "react";
import NewBoxPopUp from "../NewBoxPopUp";
import StorageBoxesContainerCSS from "./StorageBoxesContainer.module.css";
import BoxItemCSS from "../BoxItem/BoxItem.module.css";
// import TestingInitLocalStorage from "../TestingInitLocalStorage";
import BoxItem from "../BoxItem";
import information from "../../Information.json";
import AddBox from "../AddBox";
import storageFunct from "../../utils/localStorageFunct";
import RenderDemo from "../RenderDemo";

export default function StorageBoxesContainer({}) {
  //Shitty Name
  const [boxesState, setBoxesState] = useState([]);
  const [boxesComponentState, setBoxesComponentState] = useState([]);
  const [renderAddNewPopUp, setRenderAddNewPopUp] = useState(false);
  const demoRendered = useRef(false);

  useEffect(() => {
    setStorageBoxes();
  }, []);

  useEffect(() => {
    getComponents();
  }, [boxesState]);

  const initLocalStorage = () => {
    let renderDemo = window.confirm(
      "This will delete all your notes and render the demo note. Are you sure you want to do this?"
    );
    if (renderDemo) {
      storageFunct.initDemo();
      setStorageBoxes();
      window.location.reload();
    } else {
    }
  };

  const getComponents = () => {
    let ReactComponents = [];
    if (boxesState !== null) {
      const components = boxesState.map((box, i) => {
        return (
          <BoxItem key={box.boxId} content={box} deleteBox={handleBoxDelete} />
        );
      });
      ReactComponents = components;

      // setBoxesComponentState(components);
    }

    setBoxesComponentState(ReactComponents);
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
    getComponents();
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
    <>
      <RenderDemo onClick={initLocalStorage} />
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
        {boxesComponentState}
      </div>
    </>
  );
}
