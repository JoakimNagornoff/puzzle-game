import React, { useEffect, useState } from 'react'
import './board.css'
import PuzzleItem from '../puzzleItem/puzzleItem.tsx'

const Board = () => {
  const [positions, setPositions] = useState([...Array(15).keys()])


  useEffect(() => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort(() => Math.random() - 0.5);
      return newPos
    })
  }, [])
  return (
    <div className='board-container'>
      {positions.map((pos, index) => {
        const number = pos === 14 ? null : pos + 1;
        return (
          <PuzzleItem key={index} number={number} onClick={() => console.log(`cliked ${number}`)} />
        )
      })}
    </div>
  )
}

export default Board