import { IWinStatus } from "./interfaces";

export const checkWinner = (
  gameMap: string[][],
  rowIndex: number,
  colIndex: number
) => {
  const WIN_CONDITION_X = ["X", "X", "X"];
  const WIN_CONDITION_O = ["O", "O", "O"];
  let winStatus: IWinStatus = {
    isWinning: false,
    winningSide: null,
  };

  let tempChecker_row = [];
  let tempChecker_col = [];
  
  for (let i = 0; i < 3; i++) {
    tempChecker_row.push(gameMap[rowIndex][i]);
  }

  for (let i = 0; i < 3 ; i++){
    tempChecker_col.push(gameMap[i][colIndex]);
  }

  const isXWinning = tempChecker_row.every((value, index) => value === WIN_CONDITION_X[index]) || tempChecker_col.every((value, index) => value === WIN_CONDITION_X[index]);
  const isOWinning = tempChecker_row.every((value, index) => value === WIN_CONDITION_O[index]) || tempChecker_col.every((value, index) => value === WIN_CONDITION_O[index])

  if (isXWinning) {
    winStatus = {
      isWinning: true,
      winningSide: "X",
    };
    return winStatus;
  }
  console.log(isXWinning)
  if (isOWinning) {
    winStatus = {
      isWinning: true,
      winningSide: "O",
    };
    return winStatus;
  }
  console.log(isXWinning);
  console.log(tempChecker_row);
  return winStatus;
};
