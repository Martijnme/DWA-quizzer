import Question from "./Questions";
const QuestionField = (props) => {
  return (
    <div className="questionscontainer">
      {props.questions && props.questions.length > 0 ? (
        props.questions.map((question, id) => {
          return <Question question={question} key={id} onSelect={"test"} />;
        })
      ) : (
        <p> someting went wrong, cant load questions </p>
      )}
    </div>
  );
};
export default QuestionField;
