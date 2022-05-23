import { useEffect, useState } from "react";
import "../styles/pillar.css";

const Pillar = (props) => {
  const [name, setName] = useState();
  const [score, setScore] = useState();

  useEffect(() => {
    if (props.team !== undefined) {
      setName(props.team.players);
      setScore(props.team.score);
    }
  })

  return (
    <div className={`pillar ${props.classes}`}>
      <h3>{name}</h3>
      <h4>{score}</h4>
    </div>
  );
};

export default Pillar;
