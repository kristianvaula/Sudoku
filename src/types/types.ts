export type SudokuBoard = {
  id: string;
  values: number[][]; // 2D array of numbers
  markers: number[][]; // 2D array of numbers
  difficulty: Difficulty;
  createdAt: string;
};

export type RootStackParamList = {
  Home: undefined;
  Sudoku: {board: SudokuBoard};
  Create: {board: SudokuBoard};
  BoardChooser: undefined;
};

export enum Difficulty {
  Unknown = 'unknown',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
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
