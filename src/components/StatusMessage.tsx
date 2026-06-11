import type { GameStatus, Player } from '@/types';

type StatusMessageProps = {
  status: GameStatus;
  currentPlayer: Player;
  winner: Player | null;
};

export default function StatusMessage({ status, currentPlayer, winner }: StatusMessageProps) {
  if (status === 'won' && winner) {
    const color = winner === 'X' ? 'text-indigo-600' : 'text-rose-500';
    return (
      <div className="text-center">
        <span className={`text-2xl font-bold ${color}`}>Player {winner}</span>
        <span className="text-2xl font-bold text-slate-800"> wins! 🎉</span>
      </div>
    );
  }

  if (status === 'draw') {
    return (
      <div className="text-center">
        <span className="text-2xl font-bold text-slate-700">It's a draw! 🤝</span>
      </div>
    );
  }

  const color = currentPlayer === 'X' ? 'text-indigo-600' : 'text-rose-500';
  return (
    <div className="text-center">
      <span className="text-lg font-medium text-slate-500">Current turn: </span>
      <span className={`text-2xl font-bold ${color}`}>{currentPlayer}</span>
    </div>
  );
}
