import React from "react";

function FinishScreen({ points, maxPossiblePoints, highscore }) {
  const percentage = (points / maxPossiblePoints).toFixed(2) * 100;
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
        {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
    </React.Fragment>
  );
}

export default FinishScreen;
