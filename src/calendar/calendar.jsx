import React, { useEffect, useState } from 'react';
import { User } from './user';

export function Calendar(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getUserAndSetUserName(username) {
      const user = await User.load(username);
      setCurrentUser(user);
    }

    getUserAndSetUserName(props.userName);
  }, [props.userName]);

  console.log(currentUser);

  return (
    <main className='container-fluid text-center'>
      Calendar Page
    </main>
  );
}
