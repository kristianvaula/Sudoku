
export const saveBoard = async (board: SudokuBoard) => {
  try {
    const jsonValue = JSON.stringify(board);
    await AsyncStorage.setItem(board.id, jsonValue);
  } catch (e) {
    console.log(e);
  }
};