function Options({ options, dispatch, answer, correctOption }) {
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
