import React from 'react';

const inputForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Type Your name... "
          value={props.userName}
          onChange={(e) => props.setUserName(e.target.value)}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <input
          type="number"
          value={props.tryNumber}
          placeholder="Your guess number..."
          min="0"
          max="9"
          style={{ minWidth: '50px', textAlign: 'center' }}
          onChange={props.handleLuckyNumber}
        />
      </div>
      <p>
        Your attempt {props.count} / {props.maxAttempt}
      </p>
      {/* {!props.isWinner && props.count >= 0 && props.count < props.maxAttempt ? (
        <button className="submit-button">Try Your Luck</button>
      ) : null} */}
      {!props.isSubmitted && props.count < props.maxAttempt && (
        <button
          type="submit"
          className="submit-button"
          onClick={props.handleSubmit}
        >
          Try Your Luck
        </button>
      )}
    </form>
  );
};

export default inputForm;
