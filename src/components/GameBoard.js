import React from 'react';
import GuessRow from './GuessRow';
import './GameBoard.css';

const GameBoard = ({ guesses, feedback, currentGuess, setCurrentGuess, handleGuess, activeRow, gameOver }) => {
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];

  const handleColorChange = (index) => {
    if (gameOver) return;
    let newGuess = [...currentGuess];
    let currentColorIndex = colors.indexOf(newGuess[index]);
    newGuess[index] = colors[(currentColorIndex + 1) % colors.length];
    setCurrentGuess(newGuess);
  };

  return (
    <div className="game-board">
      {guesses.map((guess, index) => (
        <GuessRow key={index} guess={guess} feedback={feedback[index]} active={false} />
      ))}
      {!gameOver && (
        <GuessRow
          guess={currentGuess}
          feedback={{ correct: 0, wrongPlace: 0, empty: 4 }}
          active={true}
          handleColorChange={handleColorChange}
          handleGuess={handleGuess}
          guessesLeft={12 - guesses.length}
        />
      )}
    </div>
  );
};

export default GameBoard;
