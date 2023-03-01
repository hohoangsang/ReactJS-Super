import React, { useContext } from "react";
import { UserContext } from "./UserClassContext";

export default function Info() {
  const { name, exercise } = useContext(UserContext);

  return (
    <div>
      {" "}
      <ul>
        <li>Name: {name}</li>
        <li>Type: {exercise.type}</li>
        <li>Name: {exercise.name}</li>
        <li>T-sirt: {exercise.cloths.sirt}</li>
        <li>Shoe: {exercise.cloths.shoe}</li>
        <li>Jacket: {exercise.cloths.jacket}</li>
      </ul>
    </div>
  );
}
