function NextButton({ dispatch, answer }) {
  if (!answer) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      NEXT
    </button>
  );
}

export default NextButton;
