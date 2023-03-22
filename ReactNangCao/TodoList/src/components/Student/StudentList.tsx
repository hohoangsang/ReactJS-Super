import React from 'react';

interface StudentListProps {
  studentListElement: JSX.Element[];
}

function StudentList({ studentListElement }: StudentListProps) {
  return <div>{studentListElement}</div>;
}

// export default React.memo(StudentList); //optional
export default StudentList;
