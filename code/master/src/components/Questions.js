const Question = (props) => {
  return (
    <button
      className="questionfield"
      onClick={(e) => props.onSelect(e.target)}
    >
      <p>{props.question}</p>
    </button>
  );
};
export default Question;
