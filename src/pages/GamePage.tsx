import { RotateCcw, RefreshCw } from 'lucide-react';
import Board from '@/components/Board';
import ScoreBoard from '@/components/ScoreBoard';
import StatusMessage from '@/components/StatusMessage';
import { useGame } from '@/hooks/useGame';

export default function GamePage() {
  const { state, makeMove, resetGame, resetAll } = useGame();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Tic-Tac-Toe</h1>
          <p className="text-slate-500 text-sm mt-1">Two players, one board</p>
        </div>

        {/* Score Board */}
        <ScoreBoard scores={state.scores} />

        {/* Status Message */}
        <StatusMessage
          status={state.status}
          currentPlayer={state.currentPlayer}
          winner={state.winner}
        />

        {/* Game Board */}
        <Board
          board={state.board}
          winningLine={state.winningLine}
          onCellClick={makeMove}
          disabled={state.status !== 'playing'}
        />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-sm transition-all duration-150 hover:scale-105 active:scale-95"
          >
            <RotateCcw size={16} />
            New Game
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold shadow-sm border border-slate-200 transition-all duration-150 hover:scale-105 active:scale-95"
          >
            <RefreshCw size={16} />
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
