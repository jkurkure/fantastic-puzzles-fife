import React, {useState} from "react";
import axios from 'axios';
import SudokuBoard from "../../components/sliding-grid-creation/SlidingGrid";
import styles from "./CreateSlidingPuzzlePage.module.scss"
import {useNavigate} from "react-router-dom";
import ButtonPanel from "../../components/sliding-puzzle-button-panel/ButtonPanel";
import MessageBox from "../../components/message-box/MessageBox";
import BackButton from "../../components/back-button/BackButton";

/**
 * 
 * @param {*} param0 The boolean value for if the user is logged in.
 * @returns 
 */
export default function CreateSudokuPage({isLoggedIn}) {
    const navigate = useNavigate();
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [levelName, setLevelName] = useState("");
    const [activeCell, setActiveCell] = useState("")
    const emptyBoard = new Array(3).fill().map(() => Array(3).fill(0));
    const [board, setBoard] = useState(emptyBoard);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [isSolvable, setIsSolvable] = useState(false);

    /**
     * Buttons for a valid board created.
     */
    const validButtons = [
        {
            text: "Play the Puzzle",
            onClick: () => {
                navigate("/sliding-puzzle/" + levelName);
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

    /**
     * Buttons for an invalid board created.
     */
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

    /**
     * Performs the action of pressing a digit.
     * @param {*} digit the digit that has been pressed.
     */
    const pressDigitButton = (digit) => {
        if (x !== -1)
            board[x][y] = digit;
        let copy = [];
        for (let row = 0; row < 3; ++row) {
            copy.push([]);
            for (let column = 0; column < 3; ++column) {
                copy[row].push(board[row][column]);
            }
        }
        // sets the new board.
        setBoard(copy);
    }

    /**
     * Pressing a key on the keyboard.
     */
    const pressDigitKey = (event) => {
        const keyPressed = event.key;
        // Checks it is a valid key entred.
        if (keyPressed >= '1' && keyPressed <= '8' && x >= 0 && y >= 0) {
            pressDigitButton(parseInt(keyPressed));
        }
    };

    /**
     * The level name is changed to what is inputted.
     */
    const changeLevelName = (event) => {
        setLevelName(event.target.value);
    }

    /**
     * Submits the board to the back end.
     */
    const submitBoard = () => {
        // A post request of the board.
        axios.post(process.env.REACT_APP_BACKEND_URL + "create-sliding-puzzle", {
            size: 9,
            board: board,
            levelName: levelName
        }).then(
            res => {
                // redirect to the newly created level page if successful.
                if (res.data === "VALID BOARD") {
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
        <BackButton redirectUrl="/other-games-page"/>
        <div className={styles["title"]}>
            Create your own Sliding Puzzle
        </div>
        <div className={styles["description"]}>
            <br></br>
            Input into the boxes the numbers from 1 to 8 <br>
            </br>Make sure each number is only entered once <br>
            </br> and that there is a blank space somewhere in the grid.<br>
            </br>The puzzle will be checked for solvability.<br>
            </br>Don't forget to add the name of your fantastic puzzle when you are done!
        </div>
        <div className={styles["form-area"]}>
            <div className={styles["label-description"]}>
                <label htmlFor="levelName">Level Name*</label>
            </div>
            <input type="text" className={styles["form-control"]} id="levelName" value={levelName}
                   onChange={changeLevelName}
                   placeholder="Level 1000" required/>
        </div>
        <div className={styles["grid-area"]} onKeyDown={pressDigitKey} tabIndex="0">
            <SudokuBoard setX={setX} setY={setY} board={board} setActiveCell={setActiveCell} activeCell={activeCell}/>
        </div>
        <div><ButtonPanel pressDigitButton={pressDigitButton}/>
            <div>
                <button type="button" id={styles["create-button"]} className="btn btn-secondary btn-lg"
                        onClick={(event) => submitBoard()}>Create Puzzle
                </button>
                {buttonClicked && (isSolvable ? <MessageBox message="Sliding Puzzle has been Created."
                                                            buttons={validButtons}
                                                            open={open}
                                                            setOpen={setOpen} /> :
                    <MessageBox message="Sliding Puzzle is not Valid."
                                buttons={invalidButtons}
                                open={open}
                                setOpen={setOpen} />)}
            </div>
        </div>
    </div>

}

