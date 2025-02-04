import React, { useEffect, useState } from 'react'
import './board.css'
import PuzzleItem from '../puzzleItem/puzzleItem.tsx'

const Board = () => {
  const [positions, setPositions] = useState([...Array(15).keys()])

  const shuffle = () => {
    setPositions((prevPositions) => {
      const shuffledPositions = [...prevPositions]
      shuffledPositions.sort(() => Math.random() - 0.5);
      return shuffledPositions
    })
  }


  useEffect(() => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort((a, b) => a > b ? 1 : -1);
      return newPos
    })
  }, [])
  return (
    <>
      <div className='board-container'>
        {positions.map((pos, index) => {
          const number = pos === 14 ? null : pos + 1;
          return (
            number ?
              <PuzzleItem key={index} number={number} onClick={() => console.log(`cliked ${number}`)} />
              : null
          )
        })}
      </div>
      <div className='button-container'>
        <button onClick={shuffle} className='button-shuffle'><p>Shuffle</p></button>
      </div>
    </>
  )
}

export default Board