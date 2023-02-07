import React from "react";

export default function StartScreen(props){
    
    return(
        <div className="open-screen-content">
            <h1 className="header"> Quizzical</h1>
            <button className="start-btn" onClick={ ()=> props.setShow(true) }> Start Quiz </button>
        </div>
    );
}