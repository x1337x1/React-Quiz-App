import React, { useState } from 'react';
import './App.css';
import yellowBlob from "./img/blob-yellow.png"
import blueBlob from "./img/blob-blue.png"
import StartScreen from './comps/startScreen';
import Questions from './comps/questionsScreen';


function App() {

const [show,setShow] = useState(false)

  return (
         <div>
           <img src= {yellowBlob} className='blobs-yellow' alt='blob' />
           { show ? <Questions />: <StartScreen setShow = {setShow} /> }
           <img src= {blueBlob} className='blobs-blue' alt='blob'/>
         </div>
  );
}
export default App;
