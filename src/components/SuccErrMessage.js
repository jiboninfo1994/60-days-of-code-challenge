const SuccErrMessage = (props) => {
  console.log('isLuckyMode:', props.isLuckyMode);
  console.log('tryNumber:', props.tryNumber);
  console.log('randomNumber:', props.randomNumber);
  console.log(
    'Comparison:',
    props.tryNumber === props.randomNumber?.toString()
  );

  return (
    <>
      {props.isLuckyMode &&
        (props.tryNumber === props.randomNumber?.toString() ? (
          <h2>
            Congratulations, you won! Your random number is {props.randomNumber}
          </h2>
        ) : (
          <h2>
            Uff! You lose, try again! Your random number is {props.randomNumber}
          </h2>
        ))}
    </>
  );
};

export default SuccErrMessage;
