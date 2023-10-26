"use client"
import { useState, useEffect } from "react";
import { MdRefresh } from "react-icons/md"
import { IWinStatus } from "@/utils/interfaces";
import { checkWinner, winnerChecker } from "@/utils/helpers";
import { GiTicTacToe } from "react-icons/gi"

const DEFAULT_GAME_MAP: string[][] = [["U", "U", "U"], ["U", "U", "U"], ["U", "U", "U"]];
export default function Home() {
  const [gameMap, setGameMap] = useState<string[][]>(DEFAULT_GAME_MAP);
  const [turn, setTurn] = useState<boolean>(false);
  const [alreadyWin, setAlreadyWin] = useState<boolean>(false);
  const [isDrawn, setIsDrawn] = useState<boolean>(false);

  useEffect(() => {
    let winnerFound = false;
    console.log(winnerChecker(gameMap));
    const winner: IWinStatus = winnerChecker(gameMap);
    if (winner.isMovable) {
      setAlreadyWin(true);
    }
    if(winner.isDrawn){
      setIsDrawn(true);
    }
  }, [gameMap]);

  const handleReMatch = () => {
    setGameMap(DEFAULT_GAME_MAP);
    setAlreadyWin(false);
    setTurn(false);
    setIsDrawn(false);
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
      <div className="shadow-2xl shadow-black w-[500px] h-[580px]">
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
                <span onClick={alreadyWin? undefined : ()=>handleClick(rowIndex, colIndex)} className="h-full w-[166px] border-2 flex justify-center items-center text-6xl" key={colIndex}>{col == "U"? "" : col}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="h-[50px] flex justify-center items-center text-xl w-[500px] border-2 border-black mt-3 bg-white">
        {alreadyWin && !isDrawn? `${turn? "X": "O"} is the winner`: ""}
        {isDrawn? "Game drawn" : ""}
        </div>
      </div>
    </div>
  )
}
