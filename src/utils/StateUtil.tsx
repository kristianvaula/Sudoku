import React, {createContext, useContext, useReducer} from 'react';
import {SudokuBoard} from '../types/types';

interface BoardContextProps {
  reducer: (
    state: SudokuBoard,
    action: {type: string; payload: SudokuBoard},
  ) => any;
  initialState: any;
  children: React.ReactNode;
}

export const BoardContext = createContext<any>(null);

export const BoardProvider = ({
  reducer,
  initialState,
  children,
}: BoardContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={{state, dispatch}}>
      {children}
    </BoardContext.Provider>
  );
};

export const useStateValue = () => useContext(BoardContext);
