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
                  <td>{item.isWinner ? props.winnerPosition(item) : 'N/A'}</td>
                  <td>You tried {item.totalAttempt} times</td>
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
