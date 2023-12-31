import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { dispatch, questions } = useQuiz();
  const numQuestions = questions.length;

  return (
    <div className="start">
      <h2>welcome to the React Quiz!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}

export default StartScreen;
