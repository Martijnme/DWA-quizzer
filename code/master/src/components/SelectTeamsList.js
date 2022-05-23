const SelectTeamsList = (props) => {
  return (
    <li>
      {props.teamName}
      <button
        type="button"
        onClick={() => props.onDelete(props.teamName)}
        className="cross"
      ></button>
    </li>
  );
};

export default SelectTeamsList;
