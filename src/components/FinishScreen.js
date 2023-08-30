import React from "react";
import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { points, highscore, dispatch, maxPossiblePoints } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;

  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🎈";
  else if (percentage >= 50 && percentage < 80) emoji = "🧐";
  else if (percentage >= 0 && percentage < 50) emoji = "🥲";
  else if (percentage === 0) emoji = "😔";

  return (
    <React.Fragment>
      <p className="result">
        <span>{emoji}</span> Your scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        RESTART
      </button>
    </React.Fragment>
  );
}

export default FinishScreen;
