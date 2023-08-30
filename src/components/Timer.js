import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemainning } = useQuiz();
  const mins = Math.floor(secondsRemainning / 60);
  const seconds = secondsRemainning % 60;

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins}: {seconds}
    </div>
  );
}

export default Timer;
