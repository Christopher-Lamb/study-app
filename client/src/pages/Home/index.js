import React, { useState } from "react";
import WelcomeHeader from "../../components/WelcomeHeader";
import StorageBoxesContainer from "../../components/StorageBoxesContainer";

export default function Home() {
  return (
    <>
      <WelcomeHeader />
      <StorageBoxesContainer />
    </>
  );
}
