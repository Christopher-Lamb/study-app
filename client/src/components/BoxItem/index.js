import React from "react";
import InfoStorageBox from "../InfoStorageBox";
// import BoxItemCSS from "./BoxItem.module.css";

export default function BoxItem({ info }) {
  //User Create Box item
  return (
    <>
      <InfoStorageBox canOpen={true}>
        <button>X</button>
        <h1>{info.title}</h1>
        <p>{info.text}</p>
        {/* <button>Edit</button> */}
      </InfoStorageBox>
    </>
  );
}
