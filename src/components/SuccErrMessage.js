import React from 'react';

const SuccErrMessage = (props) => {
  return (
    <>
      {props.isLuckyMode &&
        (props.tryNumber === props.randomNumber?.toString() ? (
          <h2>
            Congratulations, you won! your random number is {props.randomNumber}
          </h2>
        ) : (
          <h2>
            Uff! You lose, try again! your random number is {props.randomNumber}
          </h2>
        ))}
    </>
  );
};

export default SuccErrMessage;
