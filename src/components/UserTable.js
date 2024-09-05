import React from 'react';

const UserTable = (props) => {
  return (
    <>
      {props.users && props.users.length > 0 && (
        <div className="user-table" style={{ textAlign: 'center' }}>
          <h2>User Table</h2>

          <table style={{ minWidth: '500px', margin: 'auto' }}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Total Attempts</th>
              </tr>
            </thead>
            <tbody>
              {props.users.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{props.winnerPosition(index + 1)}</td>
                  <td>You tried {item.totalAttempt + 1} times</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserTable;
