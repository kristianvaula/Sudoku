export type SudokuBoard = {
  id: string;
  values: number[][]; // 2D array of numbers
  markers: number[][]; // 2D array of numbers
  difficulty: Difficulty;
  createdAt: string;
};

type SudokuGrid = {
  value: number[][];
  solution: number[][];
  difficulty: string;
};

export type SudokuData = {
  newboard: {
    grids: SudokuGrid[];
  };
};

export type RootStackParamList = {
  Home: undefined;
  Sudoku: {board: SudokuBoard};
  Create: {board: SudokuBoard};
  StartMenu: undefined;
};

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Unknown = 'unknown',
}

export const getDifficulty = (difficulty: string): Difficulty => {
  switch (difficulty) {
    case 'easy':
      return Difficulty.Easy;
    case 'medium':
      return Difficulty.Medium;
    case 'hard':
      return Difficulty.Hard;
    default:
      return Difficulty.Unknown;
  }
};

export enum DrawMode {
  Pencil = 'pencil',
  Erase = 'erase',
  Marker = 'marker',
}
