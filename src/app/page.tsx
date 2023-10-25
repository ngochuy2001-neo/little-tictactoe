"use client"
import { useState, useEffect } from "react";
import { MdRefresh } from "react-icons/md"
import { IWinStatus } from "@/utils/interfaces";
import { checkWinner } from "@/utils/helpers";
import { GiTicTacToe } from "react-icons/gi"

const DEFAULT_GAME_MAP: string[][] = [["U", "U", "U"], ["U", "U", "U"], ["U", "U", "U"]];
export default function Home() {
  const [gameMap, setGameMap] = useState<string[][]>(DEFAULT_GAME_MAP);
  const [turn, setTurn] = useState<boolean>(false);
  const [alreadyWin, setAlreadyWin] = useState<boolean>(false);

  useEffect(() => {
    let winnerFound = false;
  
    for (let rowIndex = 0; rowIndex < gameMap.length; rowIndex++) {
      for (let colIndex = 0; colIndex < gameMap[rowIndex].length; colIndex++) {
        const winner: IWinStatus = checkWinner(gameMap, rowIndex, colIndex);
        if (winner.isWinning) {
          console.log(winner.winningSide);
          winnerFound = true;
          setAlreadyWin(true);
          break; // Exit the inner loop
        }
      }
  
      if (winnerFound) {
        break; // Exit the outer loop if a winner is found
      }
    }
  }, [gameMap]);

  const handleReMatch = () => {
    setGameMap(DEFAULT_GAME_MAP);
  }

  const handleClick = (rowIndex: number, colIndex: number) => {
    const isAlreadyCheck = gameMap[rowIndex][colIndex] == "U"

    if(isAlreadyCheck){
      setGameMap((prevState) => {
        const newState: string [][] = [...prevState];
        newState[rowIndex] = [...prevState[rowIndex]]
        newState[rowIndex][colIndex] = turn? "O" : "X";
        setTurn(!turn);
        return newState;
      })
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="shadow-2xl shadow-blacks w-[500px] h-[580px]">
        <div className=" border-b-2 border-black h-[80px] flex justify-around items-center text-xl">
          <GiTicTacToe className="text-6xl"/>
          Tic Tac Toe
          <button onClick={handleReMatch} className="w-[50px] h-[50px] border-2 flex items-center justify-center text-white bg-yellow-400">
            <MdRefresh/>
          </button>
        </div>
        <div className="w-full h-[500px]">
          {gameMap.map((row, rowIndex) => (
            <div className="h-[166px] w-full grid grid-cols-3" key={rowIndex}>
              {row.map((col, colIndex) => (
                <span onClick={alreadyWin? undefined : ()=>handleClick(rowIndex, colIndex)} className="h-full w-[166px] border-2 flex justify-center items-center" key={colIndex}>{col == "U"? "" : col}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
