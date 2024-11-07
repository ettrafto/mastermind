import React from 'react';
import './GuessRow.css';

const GuessRow = ({ guess, feedback, active, handleColorChange, handleGuess, guessesLeft, gameOver }) => {
  return (
    <div className={`guess-row ${active ? 'active' : ''}`}>
      <div className="row-content">
        <div className="pegs">
          {guess.map((color, index) => (
            <div
              key={index}
              className="peg"
              style={{ backgroundColor: color }}
              onClick={() => active && !gameOver && handleColorChange(index)}
            ></div>
          ))}
        </div>
        <div className="feedback">
          {Array(4).fill().map((_, index) => (
            <div
              key={index}
              className={`feedback-peg ${index < feedback.correct ? 'correct' : index < feedback.correct + feedback.wrongPlace ? 'wrong-place' : 'empty'}`}
            ></div>
          ))}
        </div>
      </div>
      {active && !gameOver && (
        <div className="guess-section">
          <button className="guess-button" onClick={handleGuess}>Guess</button>
          <p>Guesses Left: {guessesLeft}</p>
        </div>
      )}
    </div>
  );
};

export default GuessRow;
