import React, {useState} from "react";
import axios from 'axios';
import SudokuBoard from "../../components/sudoku-board/SudokuBoard";
import styles from "./CreateSudokuPage.module.scss"
import {useNavigate} from "react-router-dom";
import ButtonPanel from "../../components/sudoku-button-panel/ButtonPanel";
import BackButton from "../../components/back-button/BackButton";
import MessageBox from "../../components/message-box/MessageBox";

// front-end page for the sudoku creator
export default function CreateSudokuPage({isLoggedIn}) {
    const navigate = useNavigate();
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [levelName, setLevelName] = useState("");
    const [activeCell, setActiveCell] = useState("")
    const emptyBoard = new Array(9).fill().map(() => Array(9).fill(0));
    const [board, setBoard] = useState(emptyBoard);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [isSolvable, setIsSolvable] = useState(false);

    const validButtons = [
        {
            text: "Play the Puzzle",
            onClick: () => {
                navigate("/sudoku/" + levelName);
            },
        },
        {
            text: "Create a New Game",
            onClick: () => {
                setOpen(false);
                setButtonClicked(false);
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

    // change the value of the selected cell to digit
    const pressDigitButton = (digit) => {
        if (x !== -1)
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

    // delete the value of the selected cell
    const pressDeleteButton = () => {
        if (x !== -1)
            board[x][y] = "";
        let copy = [];
        for (let row = 0; row < 9; ++row) {
            copy.push([]);
            for (let column = 0; column < 9; ++column) {
                copy[row].push(board[row][column]);
            }
        }
        setBoard(copy);
    };

    // change the coordinates of selected cell
    const pressArrowButton = (direction) => {
        switch (direction) {
            case "ArrowUp":
                setX((x + 8) % 9);
                // activeCell = x + " " + y;
                // setActiveCell(activeCell === y-1 + " " + x + styles["active-cell"]);
                break;
            case "ArrowLeft":
                setY((y + 8) % 9);// TODO check SudokuBoard.jsx and see how to setActiveCell
                break;
            case "ArrowDown":
                setX((x + 1) % 9);
                break;
            case "ArrowRight":
                setY((y + 1) % 9);
                break;
            default:
                break;
        }
    };

    // allow keypress
    const pressKey = (event) => {
        const keyPressed = event.key;
        if (keyPressed >= '1' && keyPressed <= '9' && x >= 0 && y >= 0) {
            pressDigitButton(parseInt(keyPressed));
        } else if (keyPressed === "Backspace" || keyPressed === "Delete") {
            pressDeleteButton();
        } else {
            pressArrowButton(keyPressed);
        }
    };

    const changeLevelName = (event) => {
        setLevelName(event.target.value);
    }

    // function that posts the board to the back-end
    const submitBoard = () => {
        console.log(board);
        axios.post(process.env.REACT_APP_BACKEND_URL + "create-sudoku", {
            size: 9,
            board: board,
            levelName: levelName
        }).then(
            res => {
                // redirect to the newly created level page if successful
                if (res.data === "VALID BOARD"){
                    setButtonClicked(true);
                    setOpen(true);
                    setIsSolvable(true);
                }
                else {
                    setButtonClicked(true);
                    setOpen(true);
                    setIsSolvable(false);
                }
            }
        )
    }

    return <div className={styles["page-wrapper"]}>
        <BackButton redirectUrl="/"/>
        <div className={styles["title"]}>
            Create your own Sudoku
        </div>
        <div className={styles["form-area"]}>
            <div className={styles["label-description"]}>
                <label htmlFor="levelName">Level Name*</label>
            </div>
            <input type="text" className={styles["form-control"]} id="levelName" value={levelName}
                   onChange={changeLevelName}
                   placeholder="Level 1000" required/>
        </div>
        <div className={styles["grid-area"]} onKeyDown={pressKey} tabIndex="0">
            <SudokuBoard setX={setX} setY={setY} board={board} setActiveCell={setActiveCell} activeCell={activeCell}/>
        </div>
        <div><ButtonPanel pressDigitButton={pressDigitButton}/>
            <div>
                <button type="button" id={styles["create-button"]} className="btn btn-secondary btn-lg"
                        onClick={(event) => submitBoard()}>Create Puzzle
                </button>
                {buttonClicked && (isSolvable ? <MessageBox message="Sudoku Puzzle has been Created."
                                                            buttons={validButtons}
                                                            open={open}
                                                            setOpen={setOpen} /> :
                    <MessageBox message="Sudoku Puzzle is not Valid."
                                buttons={invalidButtons}
                                open={open}
                                setOpen={setOpen} />)}
            </div>
        </div>
    </div>

}

