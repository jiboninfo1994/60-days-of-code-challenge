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
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(false);

    updateUser(randomNum);
  };

  const winnerPosition = (user) => {
    const winners = users.filter((item) => item.isWinner);
    const winnerIndex = winners.findIndex((item) => item.id === user.id);

    if (user.isWinner && winnerIndex !== -1) {
      const position = winnerIndex + 1;
      if (position === 1) return '1st';
      if (position === 2) return '2nd';
      if (position === 3) return '3rd';
      return `${position + 1}th`;
    }
    return 'N/A';
  };

  const updateUser = (randomNum) => {
    const newCount = count + 1;
    if (parseInt(tryNumber) === randomNum) {
      const newUser = {
        id: Date.now().toString(),
        title: userName,
        totalAttempt: newCount,
        isWinner: true
      };
      setIsWinner(true);
      setUsers([newUser, ...users]);
      setIsSubmitted(true);
      resetForm();
    } else if (newCount === maxAttempt) {
      // User has reached max attempts without guessing correctly
      const newUser = {
        id: Date.now().toString(),
        title: userName,
        totalAttempt: newCount,
        isWinner: false // Mark as not a winner
      };

      setIsWinner(false);
      setUsers([newUser, ...users]);
      setIsSubmitted(true);
      resetForm();
    }
  };

  const resetForm = () => {
    // setTryNumber('');
    setUserName('');
    // setIsLuckyMode(false);
    setCount(0);
    // setRandomNumber(null);
  };

  console.log('issubmitted', isSubmitted);

  return (
    <div className="App" style={{ marginTop: '40px' }}>
      <SuccErrMessage
        isLuckyMode={isLuckyMode}
        tryNumber={tryNumber}
        randomNumber={randomNumber}
        isSubmitted={isSubmitted}
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

      <UserTable
        users={users}
        winnerPosition={winnerPosition}
        isWinner={isWinner}
      />
    </div>
  );
}

export default App;
