import { useEffect } from "react";

function Timer({ dispatch, secondsRemainning }) {
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
