import { returnUniqueNum } from "./dbFunctions";
import information from "../Information.json";

const getLocal = () => {
  return JSON.parse(localStorage.getItem("StorageBoxes"));
};
const setLocal = (parsedArray) => {
  localStorage.setItem("StorageBoxes", JSON.stringify(parsedArray));
};
const getIds = () => {
  const StorageBoxes = getLocal();
  return StorageBoxes.map((box) => {
    return box.boxId;
  });
};

const storageFunct = {
  initDemo: function () {
    setLocal(information);
  },
  getAllStorage: function () {
    return JSON.parse(localStorage.getItem("StorageBoxes"));
  },
  removeAllStorage: function () {
    localStorage.removeItem("StorageBoxes");
  },
  addBox: function (title) {
    // const informationString = localStorage.getItem("StorageBoxes");
    const StorageBoxes = getLocal();

    //Gets the id of last item stored in local Storage -- Temporary --
    //If localStorage empty
    if (StorageBoxes === null) {
      const newID = 0;
      const newArray = [{ boxId: newID, title: title, content: [] }];
      setLocal(newArray);
      // localStorage.setItem("StorageBoxes", JSON.stringify(newArray));
    } else {
      //Else local storage exists
      const idArray = getIds();
      const newID = returnUniqueNum(idArray);
      //New Box/List Item
      const newBox = { boxId: newID, title: title, content: [] };

      StorageBoxes.push(newBox);
      //Send back to localStorage
      setLocal(StorageBoxes);
      // localStorage.setItem("StorageBoxes", JSON.stringify(StorageBoxes));
    }
  },
  delBox: function (boxId) {
    const StorageBoxes = getLocal();
    //Filter Box
    const updatedStorageBoxes = StorageBoxes.filter((box) => {
      if (box.boxId === boxId) {
        return;
      } else {
        return box;
      }
    });
    setLocal(updatedStorageBoxes);
    return updatedStorageBoxes;
  },
  updateBox: function (boxid) {
    console.log();
  },
  addNote: function (type, text) {

    console.log();
  },
  delNote: function (boxId, noteId) {
    console.log();
  },
  updateNote: function (boxId, noteId, text) {
    console.log();
  },
};

export default storageFunct;
