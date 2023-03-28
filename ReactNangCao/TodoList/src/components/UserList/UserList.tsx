import React, { useEffect, useInsertionEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    let ignore = false;

    console.log('userEffect running');

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(res.json());
          }, 1500);
        });
      })
      .then((res) => {
        if (!ignore) {
          console.log(res);
          setUsers(res);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const handleEvent = (event: any) => {
      console.log(event);
    };

    window.addEventListener('scroll', handleEvent);

    return () => {
      window.removeEventListener('scroll', handleEvent);
    };
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
