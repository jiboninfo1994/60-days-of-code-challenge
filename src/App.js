import { useState } from 'react';
import './App.css';
import SuccErrMessage from './components/SuccErrMessage';
import InputForm from './components/inputForm';
import UserTable from './components/UserTable';

function App() {
  const [tryNumber, setTryNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const [isLuckyMode, setIsLuckyMode] = useState(false);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [maxAttempt, setMaxAttempt] = useState(3);

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
      <SuccErrMessage
        isLuckyMode={isLuckyMode}
        tryNumber={tryNumber}
        randomNumber={randomNumber}
      />
      <InputForm
        handleSubmit={handleSubmit}
        userName={userName}
        setUserName={setUserName}
        tryNumber={tryNumber}
        handleLuckyNumber={handleLuckyNumber}
        isWinner={isWinner}
        count={count}
        maxAttempt={maxAttempt}
      />

      <UserTable users={users} winnerPosition={winnerPosition} />
    </div>
  );
}

export default App;
