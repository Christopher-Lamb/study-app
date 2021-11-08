import React from "react";
import WelcomeHeader from "../../components/WelcomeHeader";
import StorageBoxesContainer from "../../components/StorageBoxesContainer";
import information from "../../Information.json";

export default function Home() {
  return (
    <>
      <WelcomeHeader />
      <StorageBoxesContainer infoBoxes={information} />
    </>
  );
}
