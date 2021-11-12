import React, { useState } from "react";
import InfoStorageBoxCSS from "./InfoStorageBox.module.css";

export default function InfoStorageBox({ children, onClick, canOpen = false }) {
  const [classList, setClassList] = useState(`${InfoStorageBoxCSS.storageBox}`);
  const [isOpen, setIsOpen] = useState(false);
  const [toggle] = useState(canOpen);

  //Handles Open for Box clicked
  const handleClick = () => {
    //If box is able to be opened and is closed
    if (!isOpen && toggle) {
      setClassList(
        `${InfoStorageBoxCSS.storageBox} ${InfoStorageBoxCSS.storageBoxOpen}`
      );
      setIsOpen(true);
    }
    //If box is able to be opened and is open
    else if (isOpen && toggle) {
      setClassList(`${InfoStorageBoxCSS.storageBox} `);
      setIsOpen(false);
    }
  };


  return (
    <div onClick={handleClick} className={classList}>
      {children}
    </div>
  );
}
