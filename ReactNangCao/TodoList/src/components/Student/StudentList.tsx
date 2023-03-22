import React from 'react';

interface StudentListProps {
  data: string[];
}

export default function StudentList({ data }: StudentListProps) {
  return (
    <div>
      {data.map((student) => (
        <p key={student}>{student}</p>
      ))}
    </div>
  );
}
