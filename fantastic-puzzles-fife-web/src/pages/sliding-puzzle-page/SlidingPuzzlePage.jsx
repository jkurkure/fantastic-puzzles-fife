import React, {useEffect, useState} from "react";
import axios from 'axios';
import styles from "./SlidingPuzzlePage.module.scss"
import SlidingPuzzle from "../../components/sliding-grid/SlidingGrid";
import WinMessageBox from "../../components/win-message-box/WinMessageBox";
import { useNavigate } from "react-router-dom";
import MessageBox from "../../components/message-box/MessageBox";
import BackButton from "../../components/back-button/BackButton";
import CommentBox from "../../components/comment-input/CommentInputBox";
import CommentSection from "../../components/comment-section/CommentSection";
import jwtDecode from "jwt-decode";

/**
 * 
 * @returns The html for the sliding puzzle page.
 */
export default function SlidingPuzzlePage() {
    const navigate = useNavigate();
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [activeCell, setActiveCell] = useState("")
    const [isSolved, setIsSolved] = useState(false);
    // Fills the empty placeholder board with zereos.
    const emptyBoard = new Array(3).fill().map(() => Array(3).fill(0));
    const [board, setBoard] = useState(emptyBoard);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [open, setOpen] = React.useState(true);


    /**
     * Buttons for compelting the level.
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
        const puzzleID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        // A get request for the level based on the puzzle id.
        axios.get(process.env.REACT_APP_BACKEND_URL + "sliding-puzzle?puzzle=" + puzzleID).then((res) => {  
            setBoard(res.data.board);
            let copy = [];
            // Loops over the rows.
            for (let row = 0; row < 3; ++row) {
                copy.push([]);
                // Loops over the columns.
                for (let column = 0; column < 3; ++column) {
                    if (res.data.board[row][column] !== 0) {
                        copy[row].push(1);
                    } else {
                        copy[row].push(0);
                    }
                }
            }
        });
    }, []);


    /**
     * Checks the solution the user has submitted.
     */
    const checkSolution = () => {
        setButtonClicked(true);
        setOpen(true);
        let answer = 1;
        let correct = 0;
        // Loops over the rows.
        for (let row = 0;  row < 3; row++) {
            // Loops over the columns.
            for (let column = 0; column < 3; column++) {
                // Checks the correct number is in the current space.
                if (board[row][column] === answer || ((board[row][column]) === 0 && answer === 9)) {
                    correct++;
                }
                answer++;
            }
        }
        // Checks all 9 items are in the correct space.
        if (correct == 9) {
            setIsSolved(true);
        }
    }

    /**
     * 
     * @returns The username of the current user. 
     */
    const getUserName = () => {
        return jwtDecode(localStorage.getItem("token")).username + "  ";
    }

    /**
     * 
     * @returns The current puzzles name.
     */
    const getPuzzleName = () => {
        return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    }


    return <div className={styles["page-wrapper"]}  tabIndex="0">
        <BackButton redirectUrl="/sliding-levels"/>
        <div className={styles["title"]}>
            Sliding Puzzle
        </div>
        <br></br>
        <div className={styles["description"]}>
            Click a box adjacent to the blank square.<br>
            </br>Attempt to slide the numbers in order of <br>
            </br> 1, 2, 3, 4, 5, 6, 7, 8, blank.<br>
            </br>Once in that order click the check solution button.<br>
            </br>Don't forget to have fun!
        </div>
        <div className={styles["grid-area"]}>
            <SlidingPuzzle setX={setX} setY={setY} board={board} setActiveCell={setActiveCell}
                         activeCell={activeCell}/>
        </div>
        <button type="button" id={styles["check-button"]} className="btn btn-secondary btn-lg"
                onClick={event => checkSolution()}>Check Solution
        </button>
        {buttonClicked && (isSolved ? <WinMessageBox /> :
            <MessageBox message="Sliding Puzzle is not Valid."
                        buttons={buttons}
                        open={open}
                        setOpen={setOpen} />)}
        <div className={styles["comment-submission"]}>
            <CommentBox username={getUserName()} puzzType={"SlidingPuzzle"} puzzName={getPuzzleName()}/>
        </div>
        <div>
            <CommentSection puzzType={"SlidingPuzzle"} puzzName={getPuzzleName()}/>
        </div>
    </div>;
}

