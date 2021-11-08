import React, { useEffect, useState } from "react";
import WelcomeHeader from "../../components/WelcomeHeader";
import StorageBoxesContainer from "../../components/StorageBoxesContainer";
import information from "../../Information.json";

export default function Home() {
  const [informationState, setInformationState] = useState();
  useEffect(() => {
    initLocalStorage();
  }, []);
  //Init LocalStorage
  const initLocalStorage = () => {
    localStorage.setItem("information", JSON.stringify(information));
  };
  return (
    <>
      <WelcomeHeader />
      <StorageBoxesContainer infoBoxes={information} />
    </>
  );
}
