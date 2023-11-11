/**
 * @description: HttpsUtils
 * Uses Sudoku API to get a sudoku board
 * of a given difficulty.
 *
 * See https://sudoku-api.vercel.app/ for more info.
 */

const BOARD_URL =
  'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}';

export const getRandomSudokuBoard = async () => {
  try {
    const response = await fetch(BOARD_URL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
