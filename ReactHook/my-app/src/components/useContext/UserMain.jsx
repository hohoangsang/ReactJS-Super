import React, { useContext } from "react";
import Info from "./Info";
import { UserContext } from "./UserClassContext";

export default function UserMain() {
  const { changeCloth } = useContext(UserContext);

  return (
    <>
      <Info />

      <button className="change-cloth-btn" onClick={changeCloth}>
        Change cloth
      </button>
    </>
  );
}
