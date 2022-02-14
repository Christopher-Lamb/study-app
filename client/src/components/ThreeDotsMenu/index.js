import React from "react";
import ThreeDotsCSS from "../ThreeDotsMenu/ThreeDotsMenu.module.css";

export default function ThreeDotsMenu({ onClick }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        // onClick();
      }}
      className={ThreeDotsCSS.dotsContainer}
    >
      <div className={`${ThreeDotsCSS.dot1} ${ThreeDotsCSS.dots}`}>.</div>
      <div className={`${ThreeDotsCSS.dot2} ${ThreeDotsCSS.dots}`}>.</div>
      <div className={`${ThreeDotsCSS.dot3} ${ThreeDotsCSS.dots}`}>.</div>
    </div>
  );
}
