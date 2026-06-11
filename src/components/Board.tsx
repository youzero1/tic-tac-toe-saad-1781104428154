import clsx from 'clsx';
import type { Board as BoardType, Player } from '@/types';

type BoardProps = {
  board: BoardType;
  winningLine: number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
};

export default function Board({ board, winningLine, onCellClick, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-72 h-72">
      {board.map((cell, index) => {
        const isWinning = winningLine ? winningLine.includes(index) : false;
        return (
          <Cell
            key={index}
            value={cell}
            isWinning={isWinning}
            onClick={() => onCellClick(index)}
            disabled={disabled || cell !== null}
          />
        );
      })}
    </div>
  );
}

type CellProps = {
  value: Player | null;
  isWinning: boolean;
  onClick: () => void;
  disabled: boolean;
};

function Cell({ value, isWinning, onClick, disabled }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center rounded-2xl text-5xl font-extrabold transition-all duration-200 select-none',
        'border shadow-sm',
        isWinning
          ? 'bg-yellow-50 border-yellow-300 scale-105 shadow-yellow-100'
          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300',
        !disabled && !value && 'cursor-pointer hover:scale-105',
        disabled && !isWinning && 'cursor-default',
        value === 'X' ? 'text-indigo-500' : 'text-rose-500'
      )}
    >
      {value}
    </button>
  );
}
