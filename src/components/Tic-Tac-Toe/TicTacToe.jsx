import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png"; 
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (num) => {
        if (lock || data[num] !== "") return;

        const newData = [...data];
        newData[num] = count % 2 === 0 ? "X" : "O";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (board) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                won(board[a]);
                return;
            }
        }

        // If board is full and no one has won, it's a draw
        if (!board.includes("")) {
            titleRef.current.innerText = "It's a Draw!";
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congrats: <img src=${winner === "X" ? cross_icon : circle_icon} alt="winner"/> Wins`;
    };

    const reset = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        titleRef.current.innerText = "Tic Tac Toe";
    };

    return (
        <div className="container">
            <h1 className="heading" ref={titleRef}>Tic Tac Toe</h1>
            <button className="reset" onClick={reset}>Reset</button>
            <div className="board">
                {data.map((val, index) => (
                    <div key={index} className="boxes" onClick={() => toggle(index)}>
                        {val && <img src={val === "X" ? cross_icon : circle_icon} alt="mark" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicTacToe;
