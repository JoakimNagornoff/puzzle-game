import React from 'react'
import './puzzleItem.css'

const puzzleItem = ({ number, onClick }) => {
  return (
    <div className="item" onClick={onClick}>
      {number !== null && number}
    </div>
  )
}
export default puzzleItem