import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserMain from "./UserMain";

const Container = styled.div`
  display: block;
  margin: 1rem;
`;

function initExerciseData() {
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

export const UserContext = createContext();

export default function UserClassContext() {
  const [, forceRender] = useState(0);
  const [exercise, setExercise] = useState(initExerciseData);
  const [name, setName] = useState("Alex");

  const forceReRender = () => {
    forceRender((prevState) => prevState + 1);
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

  const valueContext = {
    name,
    exercise,
    changeCloth,
  };

  return (
    <Container>
      <UserContext.Provider value={valueContext}>
        <h1>User Funtional Component</h1>
        <button onClick={forceReRender}>Force Re-render</button>

        <h2>Exercise Infomation</h2>
        <UserMain changeCloth={changeCloth} exercise={exercise} name={name} />
      </UserContext.Provider>
    </Container>
  );
}
