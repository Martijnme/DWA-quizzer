const TeamCard = (props) => {
  return (
    <tr>
      <td>
        <div className="teamcard">
          <h5>{props.team}</h5>
          <span>
            {" "}
            <p>{props.answer}</p>
          </span>
        </div>
      </td>
      <td>
        <button
          className={props.correct ? "correct" : "wrong"}
          onClick={(e) => props.toggleAnswer(e, props)}
        ></button>
      </td>
    </tr>
  );
};

export default TeamCard;
