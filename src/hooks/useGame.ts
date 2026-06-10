import { useState, useCallback } from 'react';
import type { GameState, Player, Cell } from '@/types';
import { checkWinner, checkDraw, createEmptyBoard } from '@/lib/gameLogic';

const initialState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winningLine: null,
  scores: { X: 0, O: 0, draws: 0 },
};

export function useGame(): {
  state: GameState;
  makeMove: (index: number) => void;
  resetGame: () => void;
  resetAll: () => void;
} {
  const [state, setState] = useState<GameState>(initialState);

  const makeMove = useCallback((index: number) => {
    setState((prev) => {
      if (prev.status !== 'playing' || prev.board[index] !== null) {
        return prev;
      }

      const newBoard: Cell[] = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const winResult = checkWinner(newBoard);
      if (winResult) {
        return {
          ...prev,
          board: newBoard,
          status: 'won',
          winner: winResult.winner,
          winningLine: winResult.line,
          scores: {
            ...prev.scores,
            [winResult.winner]: prev.scores[winResult.winner] + 1,
          },
        };
      }

      if (checkDraw(newBoard)) {
        return {
          ...prev,
          board: newBoard,
          status: 'draw',
          winner: null,
          winningLine: null,
          scores: {
            ...prev.scores,
            draws: prev.scores.draws + 1,
          },
        };
      }

      const nextPlayer: Player = prev.currentPlayer === 'X' ? 'O' : 'X';
      return {
        ...prev,
        board: newBoard,
        currentPlayer: nextPlayer,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningLine: null,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  return { state, makeMove, resetGame, resetAll };
}
