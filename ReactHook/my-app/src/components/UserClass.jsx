import React, { useEffect, useState } from "react";
import styled from "styled-components";

//useEffect - tổng hợp kiến thức - useEffect(callback, deps?)
// Side effects: Thuật ngữ chung trong lập trình phần mềm, chỉ việc khi có 1 tác động xãy ra trên phần mềm thì dữ liệu sẽ thay đổi
//1. useEffect(callback)
// callback sẽ chạy mỗi khi component re-render ==> giống với componentDidUpdate trong class Component
//2. useEffect(callback, [])
// callback sẽ chạy ngay khi component được render lần đầu ==> giống với componentDidMount, thường dùng để gọi api
// Logic trong callback thường dùng để kết nỗi DOM thật, gọi Api, setTimeout, setInterval, addEventListener
//3. useEffect(callback, [deps])
// callback sẽ chạy khi các deps thay đổi ==> nên đặt điều kiện cho các deps để tránh bị re-render vô hạn
// - Clean-up function trong callback
// Dùng để clear việc gọi api, hủy subscription, removeEventListener, clearTimeout, clearInterval
// logic trong clean up function sẽ được chạy trước khi các xử lý trongs side effect tiếp theo được thực thi (ngoại trừ lần mounted đầu tiên của component)
// logic trong clean up function cũng được chạy ngay trước khi component un mount
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

const tabs = ["posts", "todos", "albums"];

export default function UserClass() {
  const [, forceRender] = useState(0);
  const [exercise, setExercise] = useState(initExerciseData);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [showBtn, setShowBtn] = useState(false);

  const forceReRender = () => {
    forceRender((prevState) => prevState + 1);
  };

  useEffect(() => {
    fetchExercise().then((res) => {
      setExercise((prevExercise) => {
        const newExercise = { ...prevExercise };
        newExercise.cloths.shoe = res.cloths.shoe;
        return newExercise;
      });
    });

    const changeClothBtn = document.getElementsByClassName("change-cloth-btn");

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

    changeClothBtn[0].addEventListener("click", changeCloth);
  }, []);

  //useEffect(callback, [deps])
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, [type]);

  //handle DOM event in useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("remove event listener");
    };
  }, []);

  return (
    <Container>
      <h1>User Funtional Component</h1>
      <button onClick={forceReRender}>Force Re-render</button>

      <h2>Exercise Infomation</h2>
      <ul>
        <li>Type: {exercise.type}</li>
        <li>Name: {exercise.name}</li>
        <li>T-sirt: {exercise.cloths.sirt}</li>
        <li>Shoe: {exercise.cloths.shoe}</li>
        <li>Jacket: {exercise.cloths.jacket}</li>
      </ul>

      <button className="change-cloth-btn">Change cloth</button>

      <h3>Tabs Data</h3>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setType(tab)}
          style={
            type === tab ? { backgroundColor: "#333", color: "white" } : {}
          }
        >
          {tab}
        </button>
      ))}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {showBtn && (
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          Go to top
        </button>
      )}
    </Container>
  );
}
