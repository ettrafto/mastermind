import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

const generateSecretCode = () => {
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
  let code = [];
  for (let i = 0; i < 4; i++) {
    code.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  return code;
};

const App = () => {
  const [secretCode, setSecretCode] = useState(generateSecretCode());
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(['', '', '', '']);
  const [activeRow, setActiveRow] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    if (currentGuess.includes('')) return;
    const newFeedback = getFeedback(secretCode, currentGuess);
    setGuesses([...guesses, currentGuess]);
    setFeedback([...feedback, newFeedback]);

    if (newFeedback.correct === 4) {
      setMessage('You Win! Play Again?');
      setGameOver(true);
    } else if (guesses.length + 1 === 12) {
      setMessage('You Lose! Play Again?');
      setGameOver(true);
    } else {
      setCurrentGuess(['', '', '', '']);
      setActiveRow(activeRow + 1);
    }
  };

  const getFeedback = (code, guess) => {
    let feedback = { correct: 0, wrongPlace: 0, empty: 4 };
    let codeCopy = [...code];
    let guessCopy = [...guess];

    // Check for correct color and position
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === codeCopy[i]) {
        feedback.correct++;
        feedback.empty--;
        codeCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    // Check for correct color but wrong position
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] && codeCopy.includes(guessCopy[i])) {
        feedback.wrongPlace++;
        feedback.empty--;
        codeCopy[codeCopy.indexOf(guessCopy[i])] = null;
      }
    }

    return feedback;
  };

  const resetGame = () => {
    setSecretCode(generateSecretCode());
    setGuesses([]);
    setFeedback([]);
    setCurrentGuess(['', '', '', '']);
    setActiveRow(0);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>Mastermind</h1>
      <GameBoard
        guesses={guesses}
        feedback={feedback}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        handleGuess={handleGuess}
        activeRow={activeRow}
        gameOver={gameOver}
      />
      <div className="status">
        {message ? (
          <div>
            <p>{message}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <p></p>        
        )}
      </div>
    </div>
  );
};

export default App;
