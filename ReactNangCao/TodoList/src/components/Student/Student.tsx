import React, { useId, useMemo, useState, useTransition } from 'react';
import studentNames from './mock.json';
import StudentList from './StudentList';

export default function Student() {
  const [studentName, setStudentName] = useState<string>('');
  const [deferredStudentName, setDeferredStudentName] = useState<string>('');
  const id = useId();
  const [isLoading, starTransition] = useTransition();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);

    starTransition(() => {
      setDeferredStudentName(event.target.value);
    });
  };

  const studentNameList = useMemo(() => {
    const newStudentNameList = studentNames.map((student, index) => student + index);

    const newStudentNameList2 = newStudentNameList.map((student) => {
      const index = student.indexOf(deferredStudentName);

      if (index === -1) return <p key={student}>{student}</p>;

      return (
        <p key={student}>
          {student.slice(0, index)}
          <span style={{ backgroundColor: 'yellow' }}>{student.slice(index, index + deferredStudentName.length)}</span>
          {student.slice(index + deferredStudentName.length, student.length)}
        </p>
      );
    });

    return newStudentNameList2;
  }, [deferredStudentName]);

  return (
    <div>
      <form>
        <label htmlFor={id}>Search Name: </label>
        <input type='text' name='' id={id} onChange={handleChangeName} value={studentName} />
      </form>

      <br />

      {isLoading ? <div>Loading...</div> : <StudentList studentListElement={studentNameList} />}
      {/* <StudentList studentListElement={studentNameList} /> */}
    </div>
  );
}
