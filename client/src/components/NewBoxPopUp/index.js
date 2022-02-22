import React, { useState } from "react";
import { returnUniqueNum } from "../../hooks/dbFunctions";
import CSS from "./NewBoxPopUp.module.css";

export default function NewBoxPopUp({ onExitPopUp, onCreate }) {
  const [title, setTitle] = useState("");
  //Update State
  const handledChange = (event) => {
    const target = event.target;
    const value = target.value;
    setTitle(value);
  };

  //Read and Edit Json as of Now but in future Google docs and then Mongo or MySQL
  const addToDB = () => {
    const informationString = localStorage.getItem("StorageBoxes");
    const informationParsed = JSON.parse(informationString);

    //Gets the id of last item stored in local Storage -- Temporary --
    //
    //If localStorage empty
    if (informationParsed === null) {
      const newID = 0;
      const newArray = [{ boxId: newID, title: title, content: [] }];
      localStorage.setItem("StorageBoxes", JSON.stringify(newArray));
    } else {
      //Else local storage exists
      const idArray = informationParsed.map((box) => {
        return box.boxId;
      });
      const newID = returnUniqueNum(idArray);

      //New Box/List Item
      //
      const newBox = { boxId: newID, title: title, content: [] };

      informationParsed.push(newBox);
      //Send back to localStorage
      localStorage.setItem("StorageBoxes", JSON.stringify(informationParsed));
    }
  };

  return (
    <div className={CSS.screen}>
      <div className={CSS.container}>
        <button className={CSS.popupExit} onClick={onExitPopUp}>
          X
        </button>
        <input
          onChange={(e) => {
            handledChange(e);
          }}
          placeholder="Title"
        ></input>
        <button
          className={CSS.createBtn}
          onClick={() => {
            addToDB();
            onCreate();
          }}
        >
          <p>Create New Box</p>
        </button>
      </div>
    </div>
  );
}
