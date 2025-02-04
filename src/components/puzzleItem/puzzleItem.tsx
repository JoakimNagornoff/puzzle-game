import React from 'react'
import './puzzleItem.css'

type puzzleItemProps = {
  onClick: (number: number) => void
  number: number | null;
  index: number

}

const PuzzleItem = React.memo(({ number, onClick, index }: puzzleItemProps) => {
  return (
    <div
      className={`item ${number === null ? 'empty' : ''}`}
      onClick={number !== null ? () => onClick(index) : undefined}
    >
      {number !== null && number}
    </div>
  );
});

const PuzzleItemEmpty = React.memo(({ onClick, index }: { onClick: (index: number) => void, index: number }) => {
  return (
    <div
      className="item empty"
      onClick={index !== null ? () => onClick(index) : undefined}
    />
  );
});

export { PuzzleItem, PuzzleItemEmpty };