import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import styles from "./CrosswordPage.module.scss"
import produce from 'immer';
import CrosswordBoard from "../../components/crossword-board/CrosswordBoard";
import WinMessageBox from "../../components/win-message-box/WinMessageBox";
import MessageBox from "../../components/message-box/MessageBox";
import {useNavigate} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import CommentBox from "../../components/comment-input/CommentInputBox";
import CommentSection from "../../components/comment-section/CommentSection";
import jwtDecode from "jwt-decode";

export default function CrosswordPage() {
    const [board, setBoard] = useState({ rows: 0, cols: 0, table: [], result: null });
    const [isSolved, setIsSolved] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const crosswordBoardRef = useRef(null);
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    /**
     * The buttons for the MessageBox where the solving of the crossword was unsuccessful.
     * @type {[{onClick: onClick, text: string},{onClick: onClick, text: string},{onClick: onClick, text: string}]}
     */
    const buttons = [
        {
            text: "Continue",
            onClick: () => {
                setOpen(false);
                setButtonClicked(false);
            },
        },
        {
            text: "Restart Game",
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
        const puzzleID = window.location.href.substring(
            window.location.href.lastIndexOf("/") + 1
        );
        console.log(puzzleID);
        axios.get(process.env.REACT_APP_BACKEND_URL + "crossword?puzzle=" + puzzleID)
            .then((res) => {
                // Extract the board data from the response and set it in state.
                setBoard(res.data.grid)
            })
            .catch((err) => {
                console.error("Error fetching crossword data:", err);
            });
    }, []);

    const handleSetCellLetter = (row, col, letter) => {
        // update the board state with the new letter
        const newBoard = produce(board, draftBoard => {
            draftBoard.table[row][col].letter = letter;
        });
        setBoard(newBoard);
    };

    /**
     * Gets the values of the cells and returns them as a map of row and column values.
     * These keys map to their corresponding inputted letter.
     * @returns {Map<any, any>}
     */
    function getCellValues() {
        const whiteCells = crosswordBoardRef.current.querySelectorAll('.Cell_whiteCell__AhLIz');
        const values = new Map();
        whiteCells.forEach(cell => {
            const row = cell.getAttribute('data-row');
            const col = cell.getAttribute('data-col');
            const letter = cell.textContent;
            values.set(`${row}-${col}`, letter);
        });
        return values
    }

    /**
     * Checks the solution of the user inputted values
     * into the crossword match the solution.
     */
    const checkSolution = () => {
        setButtonClicked(true);
        setOpen(true);
        let values = getCellValues();
        for (let row = 0; row < board.grid.rows; row++) {
            for (let col = 0; col < board.grid.cols; col++) {
                const cellValue = board.grid.table[row][col];
                if (!/^[a-z]$/i.test(cellValue)) {
                    continue; // skip black cells
                }
                const keyToMatch = row + '-' + col;
                const cellComponentValue = values.get(keyToMatch);
                if (cellComponentValue !== cellValue.toUpperCase()) {
                    setIsSolved(false);
                    return;
                }
            }
        }
        setIsSolved(true);
    }

    /**
     * Returns the username.
     * @returns {string} The decoded username.
     */
    const getUserName = () => {
        return jwtDecode(localStorage.getItem("token")).username + "  ";
    }

    /**
     * Returns the puzzle name.
     * @returns {string} The puzzle name from the url.
     */
    const getPuzzleName = () => {
        return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    }
    
    return (
        <div className={styles["page-wrapper"]} tabIndex="0">
            <BackButton redirectUrl="/crossword-levels"/>
            <div className={styles["title"]}>
                Crossword
            </div>
            <div className={styles["description"]}>
                The goal of this puzzle is to fill in the correct words in the corresponding across and down clues.
                Here are some tips on how to complete this puzzle: </div>
            <div className={styles["tips"]}>
                1: Start by reading the clues provided for each of the words in the puzzle. The clues are typically listed in numerical order, corresponding to the numbered squares on the grid.
                <br></br>
                2: Look for any words that you already know, or that are easy to figure out based on the letters you already have in the grid.
                <br></br>
                3: Begin filling in the words one letter at a time, starting with the letters that are part of more than one word.
                <br></br>
                4: As you fill in words, be sure to double-check that they fit with the letters of any intersecting words.
                <br></br>
                5: If you get stuck, try thinking of synonyms or alternative meanings for the clue. Sometimes, changing your perspective can help you see the answer more clearly.
                <br></br>
                6: Keep working through the puzzle until all the words are filled in correctly. And remember, the most important thing is to have fun!

            </div>
            {board.result !== null && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CrosswordBoard board={board} setCellLetter={handleSetCellLetter} crosswordBoardRef={crosswordBoardRef}/>
                </div>
            )}
            <div>
                <button type="button" id={styles["check-button"]} className="btn btn-secondary btn-lg"
                        onClick={event => checkSolution()}>Check Solution
                </button>
                {buttonClicked && (isSolved ? <WinMessageBox /> :
                    <MessageBox message="Solution not yet found."
                                buttons={buttons}
                                open={open}
                                setOpen={setOpen} />)}
            </div>
            <div className={styles["comment-submission"]}>
            <CommentBox username={getUserName()} puzzType={"Crossword"} puzzName={getPuzzleName()}/>
        </div>
        <div>
            <CommentSection puzzType={"Crossword"} puzzName={getPuzzleName()}/>
        </div>
    </div>
    );
}
