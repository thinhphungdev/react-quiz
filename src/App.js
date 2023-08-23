import { useEffect, useReducer, Fragment } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  // loading, error, active, ready,  finished
  status: "loading",
  currentQuestionIdx: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.currentQuestionIdx);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIdx: state.currentQuestionIdx++,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, currentQuestionIdx, answer, points, highscore } =
    state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <Fragment>
            <Progress
              maxPossiblePoints={maxPossiblePoints}
              index={currentQuestionIdx}
              numQuestions={numQuestions}
              points={points}
              answer={answer}
            />

            <Question
              dispatch={dispatch}
              question={questions[currentQuestionIdx]}
              answer={answer}
            />

            <NextButton
              currentQuestionIdx={currentQuestionIdx}
              numQuestions={numQuestions}
              dispatch={dispatch}
              answer={answer}
            />
          </Fragment>
        )}
        {status === "finished" && (
          <FinishScreen
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoints}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}
