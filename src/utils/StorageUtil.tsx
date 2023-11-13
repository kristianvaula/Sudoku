import {Difficulty, SudokuBoard, SudokuData} from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBoard} from './SudokuUtil';

import fs from 'react-native-fs';

type BoardsType = {
  [difficulty: string]: {
    [id: string]: SudokuBoard;
  };
};

const DEFAULT_BOARDS_PATH = 'boards/'; // Assuming it's relative to the project root
const BOARDS_KEY = '@Sudoku:Boards';

export const initDefaultBoards = async (): Promise<void> => {
  try {
    console.log('Checking default boards');
    const boardsExist = await AsyncStorage.getItem(BOARDS_KEY);
    const defaultBords: BoardsType = JSON.parse(boardsExist as string);
    if (
      defaultBords &&
      defaultBords.hasOwnProperty(Difficulty.Easy) &&
      Object.keys(defaultBords[Difficulty.Easy]).length > 0
    ) {
      console.log('Boards already loaded');
    } else {
      const boards: BoardsType = await loadDefaultBoards().catch(e => {
        console.log(e);
        return {};
      });
      console.log('Storing default boards');
      await AsyncStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
    }
  } catch (e) {
    console.log(e);
  }
};

const loadDefaultBoards = async (): Promise<BoardsType> => {
  const boards: BoardsType = {
    easy: {},
    medium: {},
    hard: {},
    custom: {},
  };

  try {
    for (const level of Object.values(Difficulty)) {
      const folderPath = `${DEFAULT_BOARDS_PATH}${level}`;
      const boardFiles: fs.ReadDirItem[] = await fs.readDirAssets(folderPath);
      for (const file of boardFiles) {
        const path = file.path;
        const boardData = await fs.readFileAssets(path);
        const boardId = file.name.replace('.json', '');
        boards[level][boardId] = createBoard(
          JSON.parse(boardData) as SudokuData,
        );
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    return boards;
  }
};

export const getBoards = async (): Promise<SudokuBoard[]> => {
  var res: SudokuBoard[] = [];
  try {
    const data = await AsyncStorage.getItem(BOARDS_KEY);
    if (data !== null) {
      const boards: BoardsType = JSON.parse(data);
      const keys = Object.keys(boards);
      for (const key of keys) {
        const boardIds = Object.keys(boards[key]);
        for (const id of boardIds) {
          res.push(boards[key][id]);
        }
      }
    }
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBoard = async (
  difficulty: Difficulty,
): Promise<SudokuBoard | null> => {
  console.log('Getting board');
  try {
    const data = await AsyncStorage.getItem(BOARDS_KEY);
    if (data) {
      const boards: BoardsType = JSON.parse(data);
      const difficultyBoards = boards[difficulty];
      if (difficultyBoards) {
        const boardIds = Object.keys(difficultyBoards);
        const randomId = boardIds[Math.floor(Math.random() * boardIds.length)];
        return difficultyBoards[randomId];
      }
    } else {
      console.log('Data is null');
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveBoard = async (board: SudokuBoard): Promise<boolean> => {
  try {
    const data = await AsyncStorage.getItem(BOARDS_KEY);
    if (data !== null) {
      const boards: BoardsType = JSON.parse(data);
      boards[board.difficulty][board.id] = board;
      await AsyncStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
