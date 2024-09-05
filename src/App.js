import { useState } from 'react';
import './App.css';

function App() {
  const [tryNumber, setTryNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [isLuckyMode, setIsLuckyMode] = useState(false);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  const handleLuckyNumber = (e) => {
    const inputVal = e.target.value;

    if (inputVal === '' || (inputVal >= 0 && inputVal <= 9)) {
      setTryNumber(inputVal);
    } else {
      alert('Your number must be 0-9');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tryNumber === '' || !userName) {
      return alert('Number and Name field is required!');
    }

    const randomNum = Math.floor(Math.random() * 10);

    setRandomNumber(randomNum);
    setIsLuckyMode(true);
    setCount(count + 1);

    updateUser(randomNum);
  };

  const winnerPosition = (number) => {
    if (number === 1) return number + 'st';
    if (number === 2) return number + 'nd';
    if (number === 3) return number + 'rd';
    return number + 'th';
  };

  const updateUser = (randomNum) => {
    if (parseInt(tryNumber) === randomNum) {
      const newUser = {
        id: Date.now().toString(),
        title: userName,
        totalAttempt: count
      };

      setIsWinner(true);
      setUsers([...users, newUser]);
    }
  };

  return (
    <div className="App" style={{ marginTop: '40px' }}>
      {isLuckyMode &&
        (tryNumber === randomNumber?.toString() ? (
          <h2>
            Congratulations, you won! your random number is {randomNumber}
          </h2>
        ) : (
          <h2>
            Uff! You lose, try again! your random number is {randomNumber}
          </h2>
        ))}

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Type Your name... "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <input
            type="number"
            value={tryNumber}
            placeholder="Your guess number..."
            min="0"
            max="9"
            style={{ minWidth: '50px', textAlign: 'center' }}
            onChange={handleLuckyNumber}
          />
        </div>
        {!isWinner && count >= 0 && count < 10 ? (
          <button className="submit-button">Try Your Luck</button>
        ) : null}
      </form>

      {users && users.length > 0 && (
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
              {users.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{winnerPosition(index + 1)}</td>
                  <td>You tried {item.totalAttempt + 1} times</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
