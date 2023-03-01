import React, { useEffect, useState } from "react";

const lessondata = [
  {
    id: 1,
    name: "Learning HTML/CSS",
  },
  {
    id: 2,
    name: "Learning Javascript",
  },
  {
    id: 3,
    name: "Learning ReactJS",
  },
];

export default function FakeChatApp() {
  const [lessonId, setLessonId] = useState(1);

  const handleChangeLesson = (id) => {
    setLessonId(id);
  };

  useEffect(() => {
    const handleEvent = ({ detail }) => {
      console.log(detail);
    };

    window.addEventListener(`lesson-${lessonId}`, handleEvent);

    //clean up function
    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleEvent);
    };
  }, [lessonId]);

  return (
    <ul>
      {lessondata.map((lesson) => (
        <li
          key={lesson.id}
          onClick={() => handleChangeLesson(lesson.id)}
          style={{ color: lessonId === lesson.id ? "red" : "#333" }}
        >
          {lesson.name}
        </li>
      ))}
    </ul>
  );
}
