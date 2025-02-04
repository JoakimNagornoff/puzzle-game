import React, { useEffect, useState } from 'react'
import './board.css'
import { PuzzleItem, PuzzleItemEmpty } from '../puzzleItem/puzzleItem.tsx'


const Board = () => {
  const [positions, setPositions] = useState<(number | null)[]>(() => {
    const numbers = [...Array(14
    ).keys()].map(n => n + 1);
    return [...numbers, null] as (number | null)[];
  });

  const initialPositions = [...Array(14).keys()].map(n => n + 1);
  const [savedInitialPositions] = useState<(number | null)[]>(initialPositions);
  const [hasGameStarted, setGameStarted] = useState<boolean>(false)

  const emptyIndex = positions.indexOf(null);
  const rowSize = 5;


  const shuffle = () => {
    setPositions((prevPositions) => {
      const shuffledPositions = [...prevPositions];
      shuffledPositions.sort(() => Math.random() - 0.5);
      return shuffledPositions;
    })
    setGameStarted(true)
  }


  const isValidMove = (clickedIndex: number) => {
    return (
      (clickedIndex === emptyIndex - 1 && emptyIndex % rowSize !== 0) || // Left
      (clickedIndex === emptyIndex + 1 && clickedIndex % rowSize !== 0) || // Right
      clickedIndex === emptyIndex - rowSize || // Above
      clickedIndex === emptyIndex + rowSize // Below
    );
  }
  const checkCompletion = (newPositions: (number | null)[]) => {
    const positionsWithoutNull = newPositions.filter(pos => pos !== null);
    const isComplete = JSON.stringify(positionsWithoutNull) === JSON.stringify(savedInitialPositions);
    if (isComplete) {
      alert("Congratulations! You've completed the puzzle!");
    }
  };

  const handleTileClick = (index: number) => {
    if (!hasGameStarted) {
      alert("Start the game with the Shuffle button!");
      return;
    }
    if (!isValidMove(index)) return

    const newPositions = [...positions];
    [newPositions[index], newPositions[emptyIndex]] = [newPositions[emptyIndex], newPositions[index]];
    checkCompletion(newPositions)
    setPositions(newPositions);
  }

  useEffect(() => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort((a, b) => (a !== null && b !== null ? a - b : a === null ? 1 : -1));
      return newPos;
    })
  }, [])

  return (
    <>
      <div className='board-container'>
        {positions.map((pos, index) => {
          const number = pos === null ? null : pos;

          return number !== null ? (
            <PuzzleItem key={index} index={index} number={number} onClick={() => handleTileClick(index)} />
          ) : (
            <PuzzleItemEmpty key={index} index={index} onClick={() => handleTileClick(index)} />
          );
        })}
      </div>
      <div className='button-container'>
        <button onClick={shuffle} className='button-shuffle'><p>Shuffle</p></button>
      </div>
    </>
  )
}

export default Board