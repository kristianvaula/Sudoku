import {
  Difficulty,
  SudokuBoard,
  SudokuData,
  getDifficulty,
} from '../types/types';
import {getRandomSudokuBoard} from './HttpUtil';
import uuid from 'react-native-uuid';

export const isSolved = (board: SudokuBoard): boolean => {
  const n = board.values.length;

  for (let i = 0; i < n; i++) {
    const row = board.values[i];

    if (row.includes(0)) {
      return false;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= n; j++) {
      if (!board.values[i].includes(j)) {
        return false;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const column = board.values.map(row => row[i]);

    for (let j = 1; j <= n; j++) {
      if (!column.includes(j)) {
        return false;
      }
    }
  }

  const subGridSize = Math.sqrt(n);
  for (let i = 0; i < n; i += subGridSize) {
    for (let j = 0; j < n; j += subGridSize) {
      const subGrid = [];
      for (let k = 0; k < subGridSize; k++) {
        for (let l = 0; l < subGridSize; l++) {
          subGrid.push(board.values[i + k][j + l]);
        }
      }

      for (let k = 1; k <= n; k++) {
        if (!subGrid.includes(k)) {
          return false;
        }
      }
    }
  }

  return true;
};

export const isValidBoard = (board: SudokuBoard): boolean => {
  const n = board.values.length;

  // Check if board size is a perfect square
  if (Math.sqrt(n) % 1 !== 0) {
    return false;
  }

  // Check for valid values
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const value = board.values[i][j];
      if (value < 0 || value > n || !Number.isInteger(value)) {
        return false;
      }
    }
  }

  // Check rows
  for (let i = 0; i < n; i++) {
    const rowSet = new Set();
    for (let j = 0; j < n; j++) {
      if (board.values[i][j] !== 0) {
        if (rowSet.has(board.values[i][j])) {
          return false;
        }
        rowSet.add(board.values[i][j]);
      }
    }
  }

  // Check columns
  for (let j = 0; j < n; j++) {
    const colSet = new Set();
    for (let i = 0; i < n; i++) {
      if (board.values[i][j] !== 0) {
        if (colSet.has(board.values[i][j])) {
          return false;
        }
        colSet.add(board.values[i][j]);
      }
    }
  }

  // Check sub-grids
  const subGridSize = Math.sqrt(n);
  for (let row = 0; row < n; row += subGridSize) {
    for (let col = 0; col < n; col += subGridSize) {
      const subGridSet = new Set();
      for (let i = row; i < row + subGridSize; i++) {
        for (let j = col; j < col + subGridSize; j++) {
          if (board.values[i][j] !== 0) {
            if (subGridSet.has(board.values[i][j])) {
              return false;
            }
            subGridSet.add(board.values[i][j]);
          }
        }
      }
    }
  }

  return true;
};

export const createBoard = (data: SudokuData): SudokuBoard => {
  const {grids} = data.newboard;
  const grid = grids[0];
  const {value, difficulty} = grid;

  const board = {
    id: uuid.v4().toString(),
    values: value,
    markers: Array(value.length).fill(Array(value.length).fill(0)),
    difficulty: getDifficulty(difficulty),
    createdAt: new Date().toISOString(),
  };

  return board;
};

export const createEmptyBoard = (): SudokuBoard => {
  const board = {
    id: uuid.v4().toString(),
    values: Array.from({length: 9}, () => Array.from({length: 9}, () => 0)),
    markers: Array.from({length: 9}, () => Array.from({length: 9}, () => 0)),
    difficulty: Difficulty.Custom,
    createdAt: new Date().toISOString(),
  };

  return board;
};

export const getRandomBoard = async (): Promise<SudokuBoard> => {
  const data = await getRandomSudokuBoard();
  const board = createBoard(data);
  return board;
};
