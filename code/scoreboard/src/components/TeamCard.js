import "../styles/card.css";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { bindActionCreators } from 'redux';

const TeamCard = (props) => {
    const [questionEnded, setQuestionEnded] = useState();
    const [answers, setAnswers] = useState();

    useEffect(() => {
        setQuestionEnded(props.questionEnded);
        setAnswers(props.answers);
    })

    return (
        <div className={props.classes}>
            <h3 className='cardName'>{props.name}</h3>
            <h4 className='cardScore'>score: {props.score}</h4>
            <Answer questionEnded={questionEnded} answers={answers} name={props.name} />
        </div>
    )
};

const Answer = (props) => {
    let returnValue = "";

    if (props.questionEnded) {
        props.answers.forEach(answer => {
            if (answer.teamName === props.name) {
                console.log("return!");
                returnValue = answer.answer;
            }
        });
    }

    return (
        <p>{returnValue}</p>
    )
}

function mapStateToProps(state) {
    return {
        questionEnded: state.game.questionEnded,
        answers: state.game.answers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamCard);