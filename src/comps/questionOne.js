import React from 'react';
import {decode} from 'html-entities';

export default function QuestionOne(props){

function clickAnswer(answer, currentQuestion){
props.updateselected(currentQuestion, answer)
 
}

const allAnswer = props.allAnswers.map((answer,index) => {

    return (<button 
        
        className={`answer-btn ${
            answer === props.selectedAnswer ? "selected" : ""}
        ${props.result && answer === props.correctAnswer ? "correct" : ""}
        ${props.result && answer === props.selectedAnswer &&
        answer !== props.correctAnswer ? "incorrect" : ""}
        `}

        key ={index}
        onClick = {() => clickAnswer(answer, props.question) } 
        > {answer} </button>)
} )
    return(
        <div className="question-container">
        <h1 className="question"> {decode(props.question)} </h1>
        <div className="answers-btn-container"> {decode(allAnswer)} </div>
      </div>
    )
}
