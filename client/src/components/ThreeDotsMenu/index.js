import React, { useState } from "react";
import ThreeDotsCSS from "../ThreeDotsMenu/ThreeDotsMenu.module.css";
import DeleteBoxPopUp from "../DeleteBoxPopUp";

export default function ThreeDotsMenu({ onDel }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <DeleteBoxPopUp onClick={onDel} />}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }

          // onClick();
        }}
        className={ThreeDotsCSS.container}
      >
        <div className={`${ThreeDotsCSS.dot1} ${ThreeDotsCSS.dots}`}>.</div>
        <div className={`${ThreeDotsCSS.dot2} ${ThreeDotsCSS.dots}`}>.</div>
        <div className={`${ThreeDotsCSS.dot3} ${ThreeDotsCSS.dots}`}>.</div>
      </div>
    </>
  );
}
