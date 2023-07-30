import React from 'react';
import Notes from '../../components/Notes';


const home = () => {
    return (
        <div>
        <h1>Home</h1>
        <p>Minature Vite + React demo website.</p>
        <p>It uses NodeJs, Express & MongoDB as a backend!</p>
  
       <Notes/>
  
      </div>
    )
}

export default home
