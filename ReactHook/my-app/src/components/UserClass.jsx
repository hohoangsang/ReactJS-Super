import React, { useState } from "react";

function initExerciseData() {
  console.log("init data reder");

  return {
    type: "lower body",
    name: "leg press",
    cloths: {
      sirt: 1,
      shoe: 1,
      jacket: 0,
    },
  };
}

export default function UserClass() {
  const [name, setName] = useState("Sang");
  const [age, setAge] = useState(10);
  const [, forceRender] = useState(0);
  const [address, setAddress] = useState({
    province: "QuangNam",
    city: "HoiAn",
  });
  const [exercise, setExercise] = useState(initExerciseData);

  const increaseAge = () => {
    setAge((prevAge) => prevAge + 1);
  };

  const forceReRender = () => {
    forceRender((prevState) => prevState + 1);
  };

  const changeCity = () => {
    setAddress((prevAddress) => {
      return {
        ...prevAddress,
        city: "Danang",
      };
    });
  };

  const changeCloth = () => {
    setExercise((prevExcersie) => {
      const newCloths = { ...prevExcersie.cloths };
      newCloths.jacket = 1;
      return {
        ...prevExcersie,
        cloths: newCloths,
      };
    });
  };

  // console.log("re-render");

  return (
    <div>
      <h1>User Funtional Component</h1>
      <ul>
        <li>Name: {name}</li>
        <li>Age: {age}</li>
        <li>Province: {address.province}</li>
        <li>City: {address.city}</li>
      </ul>
      <button onClick={increaseAge}>Increase Age</button>
      <button onClick={forceReRender}>Force Re-render</button>
      <button onClick={changeCity}>Change City</button>

      <h2>Exercise Infomation</h2>
      <ul>
        <li>Type: {exercise.type}</li>
        <li>Name: {exercise.name}</li>
        <li>T-sirt: {exercise.cloths.sirt}</li>
        <li>Shoe: {exercise.cloths.shoe}</li>
        <li>Jacket: {exercise.cloths.jacket}</li>
      </ul>

      <button onClick={changeCloth}>Change cloth</button>
    </div>
  );
}
