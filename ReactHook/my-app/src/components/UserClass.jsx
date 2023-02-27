import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

//useEffect - tổng hợp kiến thức
//1. useEffect(callback)
// callback sẽ chạy mỗi khi component re-render ==> giống với componentDidUpdate trong class Component
//2. useEffect(callback, [])
// callback sẽ chạy ngay khi component được render lần đầu ==> giống với componentDidMount, thường dùng để gọi api
//3. useEffect(callback, [deps])
// callback sẽ chạy khi các deps thay đổi ==> nên đặt điều kiện cho các deps để tránh bị re-render vô hạn
// - Clean-up function trong callback
// Dùng để clear việc gọi api, hủy subscription, event handler, setTimeout, setInterval
// logic trong clean up function sẽ được chạy trước khi side effect tiếp theo được thực thi
// ========
// Điểm chung của cả 3 trường hợp
// callback trong useEffect luôn chạy mỗi khi component được mount ==> có thể truy cập vào DOM thật
// Những giá trị mà useEffect sẽ báo là cần đặt vào trong deps nếu trong callback có sử dụng những giá trị đó: state, giá trị tham chiếu

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

const fetchExercise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: "lower body",
        name: "leg press",
        cloths: {
          sirt: 300,
          shoe: 200,
          jacket: 0,
        },
      });
    }, 4000);
  });

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

  useEffect(() => {
    console.log("component render");
    fetchExercise().then((res) => {
      setExercise((prevExercise) => {
        const newExercise = { ...prevExercise };
        newExercise.cloths.shoe = res.cloths.shoe;
        return newExercise;
      });
    });
  }, []);

  useEffect(() => {
    console.log("age: ", age);

    return () => {
      console.log("clean up function");
    };
  }, [age]);

  console.log("render");

  return (
    <Container>
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

      <br />
    </Container>
  );
}
