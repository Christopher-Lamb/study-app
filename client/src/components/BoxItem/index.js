import React from "react";
// import BoxItemCSS from "./BoxItem.module.css";

export default function BoxItem({ info }) {
  //User Create Box item
  return (
    <>
      <h1>{info.title}</h1>
      <p>{info.text}</p>
      {/* <button>Edit</button> */}
    </>
  );
}
