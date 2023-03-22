import React, { useId, useMemo, useState } from 'react';
import StudentList from './StudentList';
import studentNames from './mock.json';

export default function Student() {
  const [studentName, setStudentName] = useState<string>('');
  const id = useId();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  const studentNameList = useMemo(() => {
    return [...new Set(studentNames)];
  }, []);

  console.log(studentNameList);

  return (
    <div>
      <form>
        <label htmlFor={id}>Search Name: </label>
        <input type='text' name='' id={id} onChange={handleChangeName} value={studentName} />
      </form>

      <br />

      <StudentList data={[]} />
    </div>
  );
}
