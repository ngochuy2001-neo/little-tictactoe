import { IWinStatus } from "./interfaces";

export const checkWinner = (
  gameMap: string[][],
  rowIndex: number,
  colIndex: number
) => {
  const WIN_CONDITION_X = ["X", "X", "X"];
  const WIN_CONDITION_O = ["O", "O", "O"];
  let winStatus: IWinStatus = {
    isMovable: false,
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
      isMovable: true,
      winningSide: "X",
    };
    return winStatus;
  }
  console.log(isXWinning)
  if (isOWinning) {
    winStatus = {
      isMovable: true,
      winningSide: "O",
    };
    return winStatus;
  }
  return winStatus;
};

export const winnerChecker = (gameMap: string[][]) => {
  const WIN_CONDITION_O = ["O","O","O"];
  const WIN_CONDITION_X = ["X","X","X"];
  let winStatus: IWinStatus = {
    isMovable: false,
    winningSide: null,
  };
  console.log(gameMap)
  for(let i = 0; i < 3; i++){
    let tempCheckerRow: string[] = [];
    let tempCheckerCol: string[] = [];
    for(let j = 0;j < 3; j++){
      tempCheckerRow.push(gameMap[i][j]);
      tempCheckerCol.push(gameMap[j][i]);
    }
    let isXWinRow = tempCheckerRow.every((element, index) => element === WIN_CONDITION_X[index]);
    let isXWinCol = tempCheckerCol.every((element, index) => element === WIN_CONDITION_X[index]);

    let isOWinRow = tempCheckerRow.every((element, index) => element === WIN_CONDITION_O[index]);
    let isOWinCol = tempCheckerCol.every((element, index) => element === WIN_CONDITION_O[index]);
    
    console.log(isXWinRow || isXWinCol);
    if(isXWinRow || isXWinCol){
      winStatus = {
        isMovable: true,
        winningSide: "X"
      }
      return winStatus;
    }

    if(isOWinCol || isOWinRow){
      winStatus = {
        isMovable: true,
        winningSide: "O",
      }
      return winStatus;
    }
    console.log(isOWinRow || isOWinCol);
  }

  //cross winning condition: left to right, right to left
  let tempChecker_ltr: string[] = [];
  let tempChecker_rtl: string[] = [];

  for(let i = 0; i < 3; i++){
    tempChecker_ltr.push(gameMap[i][i]);
    tempChecker_rtl.push(gameMap[i][2-i]);  
  }
  let isXWinCross = tempChecker_ltr.every((value, index) => value === WIN_CONDITION_X[index]) || tempChecker_rtl.every((value, index) => value === WIN_CONDITION_X[index])
  let isOWinCross = tempChecker_ltr.every((value, index) => value === WIN_CONDITION_O[index]) || tempChecker_rtl.every((value, index) => value === WIN_CONDITION_O[index])
  if(isXWinCross){
    winStatus = {
      isMovable: true,
      winningSide: "X"
    }
    return winStatus;
  }
  if(isOWinCross){
    winStatus = {
      isMovable: true,
      winningSide: "O",
    }
    return winStatus;
  }
  if(gameMap.every((value) => value.every((value) => value !== "U"))) {
    winStatus = {
      isMovable: true,
      winningSide: "Drawn",
      isDrawn: true,
    }
    return winStatus;
  }
  return winStatus;
}