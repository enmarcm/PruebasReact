import { useState } from "react";
import "./App.css";
import Square from "./components/square";

function App() {
  const TURNS = {
    X: "X",
    O: "O",
  };

  const WINNER_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setTurn(TURNS.X);
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  const verifyWinner = ({ board }) => {
    for (const position of WINNER_POSITIONS) {
      const [a, b, c] = position;

      if (board[a] === board[b] && board[b] === board[c] && board[a]) {
        return board[a];
      }
    }
    1;

    if (board.every((el) => el !== null)) return false;

    return null;
  };

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return;
    const array = [...board];
    array[index] = turn;
    setBoard(array);

    const win = verifyWinner({ board: array });

    if (win) {
      setWinner(win);
      alert(`El ganador es ${win}`);
      return resetGame();
    } else if (!win && win !== null) {
      setWinner(false);
      alert("No hubo ganador");
      return resetGame();
    }

    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
  };

  return (
    <>
      <section className="content-square">
        {board.map((_, i) => {
          return (
            <Square key={i} update={updateBoard} index={i}>
              {_}
            </Square>
          );
        })}
      </section>

      <div className="container-turn">
        <Square isActive>{turn}</Square>
      </div>
      <div className="container-btn">
        <button onClick={resetGame}>Reiniciar</button>
      </div>
    </>
  );
}

export default App;
