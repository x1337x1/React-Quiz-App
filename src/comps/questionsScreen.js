import React, { useState } from 'react';
import QuestionOne from './questionOne';

export default function Questions(){
    const [questions,setQuestions] = useState([])
    const [questionsAndAnswers,setQuestionsAndAnswers] = useState([])
    const [warningMsg,setWarningMsg] = React.useState(false)
    const [count,setCount] = React.useState(0)
    const [result,setResults] = React.useState(false)

      React.useEffect( () => {
        if(questions.length === 0) {
        fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
        .then((respone) => respone.json())
        .then((data) => {
          setQuestions(data.results);

          setQuestionsAndAnswers(data.results.map((object) => {
              return{
                question: object.question,
                shuffledAnswers: shuffleArray([...object.incorrect_answers,
                                                object.correct_answer]),
                correctAnswer: object.correct_answer ,
                selectedAnswer : ""                             

              }
          }))
        })}console.log(questionsAndAnswers[0].shuffledAnswers)
      },[questions,questionsAndAnswers ])

    
   function updateselected( currentQuestion, answer){
    setQuestionsAndAnswers(questionsAndAnswers.map( (object) => {
        return object.question === currentQuestion ? {...object, selectedAnswer: answer} : object
    } ))
   }
   
   function checkAnswers(){
    const notAll = questionsAndAnswers.some( (object) => {
     return  object.selectedAnswer === ''
    }
    )
    setWarningMsg(notAll)
     
    if(!notAll) {
      questionsAndAnswers.forEach( (object) => {
        if(object.selectedAnswer === object.correctAnswer) {
          setCount( prevstate => prevstate + 1 )
        }
      } )
      setResults(true)
    }

   }
   
    function playagain(){
      setQuestions([])
      setQuestionsAndAnswers([])
      setResults(false)
      setCount(0)
    }
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
  const Q = questionsAndAnswers.map( (objects, index) => { 
    return (
        <QuestionOne
         key={index} 
         question = {objects.question}
         allAnswers = {objects.shuffledAnswers}
         selectedAnswer = {objects.selectedAnswer}
         correctAnswer = {objects.correctAnswer}
         updateselected = {updateselected}
         result = {result}
         />
    )
 })
 
    return(
        <div>
            {Q}
            <div className='text-center'> 
            { warningMsg && <p className='warning-msg'> Please answer all question before checking </p>}
            {questions.length > 0 && !result ? <button className='check-btn' onClick={checkAnswers}> Check Answers</button>
             : null }
             </div>
             { result && <div className='results' >
              <p className='results-msg' > You scored {count}/ 5 correct answers </p>
              <button className='play-again' onClick={playagain}> Play Again</button>
             </div>}
        </div>
    )
}