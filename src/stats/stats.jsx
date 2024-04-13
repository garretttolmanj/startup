import React, { useEffect, useState } from 'react';
import { User } from '../calendar/user';

export function Stats({ userName }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [statsDict, setStatsDict] = useState({});

  useEffect(() => {
    async function getUserAndSetUserName(username) {
      const user = await User.load(username);
      setCurrentUser(user);
    }

    getUserAndSetUserName(userName);
  }, [userName]);

  useEffect(() => {
    const calculateStats = () => {
      const newStatsDict = {};
      if (currentUser) {
        for (const exercise of currentUser.exercise_list) {
          newStatsDict[exercise] = 0;
        }

        for (const key in currentUser.calendar) {
          for (let i = 0; i < currentUser.calendar[key].length; i += 4) {
            const exercise = currentUser.calendar[key][i];
            if (!newStatsDict.hasOwnProperty(exercise)) {
              continue;
            }
            const data = currentUser.calendar[key][i + 3];
            for (const item of data) {
              if (Number(item.weight) > newStatsDict[exercise]) {
                newStatsDict[exercise] = Number(item.weight);
              }
            }
          }
        }
      }
      return newStatsDict;
    };

    setStatsDict(calculateStats());
  }, [currentUser]);

  return (
    <table id="stats_table">
      <thead>
        <tr>
          <th>Lift</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(statsDict).map(([exercise, weight]) => (
          <tr key={exercise}>
            <td>{exercise}</td>
            <td>{weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
