import React, {useEffect, useState} from "react";
import axios from 'axios';
import styles from "./SudokuPage.module.scss"
import SudokuBoard from "../../components/sudoku-board/SudokuBoard";
import WinMessageBox from "../../components/win-message-box/WinMessageBox";
import ButtonPanel from "../../components/sudoku-button-panel/ButtonPanel";
import BackButton from "../../components/back-button/BackButton";
import MessageBox from "../../components/message-box/MessageBox";
import {useNavigate} from "react-router-dom";
import CommentBox from "../../components/comment-input/CommentInputBox";
import CommentSection from "../../components/comment-section/CommentSection";
import jwtDecode from "jwt-decode";

export default function SudokuPage() {
    const navigate = useNavigate();
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [activeCell, setActiveCell] = useState("")
    const [isSolved, setIsSolved] = useState(false);
    const emptyBoard = new Array(9).fill().map(() => Array(9).fill(0));
    const [board, setBoard] = useState(emptyBoard);
    const [isImmutable, setIsImmutable] = useState(emptyBoard);
    const [open, setOpen] = React.useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    const invalidButtons = [
        {
            text: "Resolve Puzzle",
            onClick: () => {
                setOpen(false);
            },
        },
        {
            text: "Create a New Game",
            onClick: () => {
                setOpen(false);
                window.location.reload();
            },
        },
        {
            text: "Go back to home",
            onClick: () => {
                setOpen(false);
                navigate("/");
            },
        },
    ];

    useEffect(() => {
        // Gets the end of the url.
        const puzzleID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        axios.get(process.env.REACT_APP_BACKEND_URL + "sudoku?puzzle=" + puzzleID).then((res) => {
            setBoard(res.data.board);
            let copy = [];
            for (let row = 0; row < 9; ++row) {
                copy.push([]);
                for (let column = 0; column < 9; ++column) {
                    if (res.data.board[row][column] !== 0) {
                        copy[row].push(1);
                    } else {
                        copy[row].push(0);
                    }
                }
            }
            setIsImmutable(copy);
        });
    }, []);

    const pressDigitButton = (digit) => {
        if (x !== -1 && isImmutable[x][y] === 0)
            board[x][y] = digit;
        let copy = [];
        for (let row = 0; row < 9; ++row) {
            copy.push([]);
            for (let column = 0; column < 9; ++column) {
                copy[row].push(board[row][column]);
            }
        }
        setBoard(copy);
    }

    const pressDigitKey = (event) => {
        const keyPressed = event.key;
        if (keyPressed >= '1' && keyPressed <= '9' && x >= 0 && y >= 0) {
            pressDigitButton(parseInt(keyPressed));
        }
    };

    const checkSolution = () => {
        const levelName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        axios.post(process.env.REACT_APP_BACKEND_URL + "sudoku/check-solution?level=" + levelName, {solution: board}).then(
            res => {
                if (res.data.message === "SOLUTION IS WRONG") {
                    setButtonClicked(true);
                    setOpen(true);
                    setIsSolved(false);
                } else if (res.data.message === "SOLUTION IS CORRECT") {
                    setButtonClicked(true);
                    setOpen(true);
                    setIsSolved(true);
                }
            }
        )
    }

    const getUserName = () => {
        return jwtDecode(localStorage.getItem("token")).username + "  ";
    }

    const getPuzzleName = () => {
        return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    }



    return <div className={styles["page-wrapper"]} onKeyDown={pressDigitKey} tabIndex="0">
        <BackButton redirectUrl="/levels"/>
        <div className={styles["title"]}>
            Sudoku
        </div>
        <div className={styles["grid-area"]}>
            <SudokuBoard setX={setX} setY={setY} board={board} isImmutable={isImmutable} setActiveCell={setActiveCell}
                         activeCell={activeCell}/>
        </div>
        <div><ButtonPanel pressDigitButton={pressDigitButton}/></div>
        <button type="button" id={styles["check-button"]} className="btn btn-secondary btn-lg"
                onClick={event => checkSolution()}>Check Solution
        </button>
        {buttonClicked && (isSolved ? <WinMessageBox /> :
            <MessageBox message="Sudoku Puzzle is not Valid."
                        buttons={invalidButtons}
                        open={open}
                        setOpen={setOpen} />)}
        <div className={styles["comment-submission"]}>
            <CommentBox username={getUserName()} puzzType={"Sudoku"} puzzName={getPuzzleName()}/>
        </div>
        <div>
            <CommentSection puzzType={"Sudoku"} puzzName={getPuzzleName()}/>
        </div>
    </div>;
}

