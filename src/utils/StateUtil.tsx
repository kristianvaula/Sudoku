import React, {createContext, useContext, useReducer} from 'react';
import {SudokuBoard} from '../types/types';

interface BoardContextProps {
  reducer: (state: SudokuBoard, action: SudokuBoard) => any;
  initialState: any;
  children: React.ReactNode;
}

export const BoardContext = createContext<any>(null);

export const BoardProvider = ({
  reducer,
  initialState,
  children,
}: BoardContextProps) => (
  <BoardContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </BoardContext.Provider>
);

export const useStateValue = () => useContext(BoardContext);
