import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;
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
        secondsRemainning: state.questions.length * SECS_PER_QUESTION,
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
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secondsRemainning: state.secondsRemainning - 1,
        status: state.secondsRemainning === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

const initialState = {
  questions: [],
  // loading, error, active, ready,  finished
  status: "loading",
  currentQuestionIdx: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemainning: null,
};

// 1) Create the Context
const QuizContext = createContext(null);

// 2) Create the provider and then provide the value
export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    currentQuestionIdx,
    answer,
    points,
    highscore,
    secondsRemainning,
  } = state;

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestionIdx,
        answer,
        points,
        highscore,
        secondsRemainning,
        dispatch,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// 3) Expose the API to consume the context
export function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("Quiz Context was used outside of the QuizProvider");

  return context;
}
