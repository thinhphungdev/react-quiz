function NextButton({ dispatch, answer, currentQuestionIdx, numQuestions }) {
  if (answer === null) return null;

  if (currentQuestionIdx < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NEXT
      </button>
    );
  }

  if (currentQuestionIdx === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        FINISH
      </button>
    );
  }
}

export default NextButton;
