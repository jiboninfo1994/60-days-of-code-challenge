import { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const increaseCounter = (byCount) => {
    setCounter(counter + byCount.payload);
  };
  const decreaseCounter = (byCount) => {
    setCounter(counter - byCount.payload);
  };
  return (
    <div className="App">
      <div className="counter-app">
        <h3>The value of counter {counter}</h3>
        <button
          className={counter === 0 ? 'disabled' : ''}
          onClick={() => decreaseCounter({ payload: 1 })}
          type="button"
        >
          Decrease by 1
        </button>
        <button
          className={counter === 10 ? 'disabled' : ''}
          type="button"
          onClick={() => increaseCounter({ payload: 1 })}
        >
          Increase by 1
        </button>
        <button type="button" onClick={() => setCounter(0)}>
          Reset Counter
        </button>
      </div>
    </div>
  );
}

export default App;
