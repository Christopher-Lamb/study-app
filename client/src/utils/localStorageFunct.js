import { returnUniqueNum } from "./dbFunctions";
import information from "../Information.json";

const note = "";
const updatedText = "";

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
      const newArray = [{ boxId: newID, title: title, notes: [] }];
      setLocal(newArray);
      // localStorage.setItem("StorageBoxes", JSON.stringify(newArray));
    } else {
      //Else local storage exists
      const idArray = getIds();
      const newID = returnUniqueNum(idArray);
      //New Box/List Item
      const newBox = { boxId: newID, title: title, notes: [] };

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
  addNote: function (type, text, boxId) {
    //type of note
    let id = 0;
    // contents of the note
    // what box to add it to
    //store type and text in a object thats going to be sent to the dom and the DB

    // console.log("file", boxId);
    const storageBoxes = getLocal();
    // console.log(storageBoxes);
    //Loop through boxes to find box we are looking for
    const updatedStorageBoxes = storageBoxes.map((box) => {
      if (boxId === box.boxId) {
        //then loop through notes and build an array of ids
        const noteIds = box.notes.map((note) => {
          return note.noteId;
        });
        id = returnUniqueNum(noteIds);
        box.notes.push({ noteId: id, type: type, text: text });
        return box;
      } else {
        return box;
      }
    });
    setLocal(updatedStorageBoxes);
    //Return Unique num
    console.log(id);
    return id;
  },
  delNote: function (boxId, noteId) {
    const storageBoxes = JSON.parse(localStorage.getItem("StorageBoxes"));

    //Finds the note we are looking for then checks what note.type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop

      if (box.boxId === boxId) {
        //If its the title element
        const updatedNotes = box.notes.filter((note) => {
          if (note.noteId === noteId) {
            return;
          } else {
            return note;
          }
        });
        box.notes = updatedNotes;
        //Build Id of notes
      }
      return box;
    });

    setLocal(updatedArray);
  },
  updateNote: function (boxId, noteId, text, type) {
    const storageBoxes = getLocal();
    //Finds the note we are looking for then checks what note.type we are adding
    const updatedArray = storageBoxes.map((box) => {
      //If the current box we are in matches the current box in loop
      if (boxId === box.boxId) {
        //If its the title element
        if (type === "title") {
          //change title to what was edited
          box.title = text;
          //return box to the array
          return box;
        } else {
          const updatedNotes = box.notes.map((note) => {
            if (note.noteId === noteId) {
              note.text = text;
              return note;
            } else {
              return note;
            }
          });
          box.notes = updatedNotes;
        }
        //Build Id of notes
      }
      return box;
    });
    setLocal(updatedArray);
  },
};

export default storageFunct;
