import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const {
    numQuestions,
    maxPossiblePoints,
    points,
    answer,
    currentQuestionIdx,
  } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestionIdx + Number(answer)}
      />

      <p>
        Question <strong>{currentQuestionIdx + 1}</strong> / {numQuestions}{" "}
      </p>

      <p>
        {" "}
        <strong>{points}</strong>
        {"/"} {maxPossiblePoints}
      </p>
    </header>
  );
}
