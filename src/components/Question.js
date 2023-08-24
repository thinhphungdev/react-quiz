import Options from "./Options";
function Question(props) {
  const { question, correctOption, options } = props.question;
  return (
    <div>
      <h4>{question}</h4>
      <Options
        correctOption={correctOption}
        options={options}
        dispatch={props.dispatch}
        answer={props.answer}
      />
    </div>
  );
}

export default Question;
