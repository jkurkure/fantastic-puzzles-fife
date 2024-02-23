import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateCrosswordPage.module.scss";
import MessageBox from "../../components/message-box/MessageBox";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";

/**
 * This class and function is responsible for the creation and display of the
 * crossword creation page to allow website users to create their own set of
 * words and clues to create a crossword puzzle to be played on the website.
 * @param isLoggedIn If the user is logged in or not.
 * @returns {JSX.Element} Returns the html code for the website.
 */
export default function CreateCrosswordPage({ isLoggedIn }) {
    const navigate = useNavigate();
    const [levelName, setLevelName] = useState("");
    const [newWords, setNewWords] = useState(Array(8).fill(""));
    const [newClues, setNewClues] = useState(Array(8).fill(""));
    const [buttonClicked, setButtonClicked] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [isSolvable, setIsSolvable] = useState(false);

    /**
     * The buttons for the MessageBox where the creation of the crossword was successful.
     * @type {[{onClick: onClick, text: string},{onClick: onClick, text: string},{onClick: onClick, text: string}]}
     */
    const validButtons = [
        {
            text: "Play the Puzzle",
            onClick: () => {
                navigate("/crossword/" + levelName);
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
     * The buttons for the MessageBox where the creation of the crossword was unsuccessful.
     * @type {[{onClick: onClick, text: string},{onClick: onClick, text: string},{onClick: onClick, text: string}]}
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
     *
     * @param event
     */
    const changeLevelName = (event) => {
        setLevelName(event.target.value);
    };

    /**
     * This method adds a new row to the crossword board to be made
     * It clones the current state of newWords and newClues into newValues and newCluesValues using spread syntax.
     * It then uses splice to insert an empty string into each of those cloned arrays at the specified index + 1.
     * Finally, it updates state for newWords and newClues with the modified cloned arrays.
     * @param index Specifies the index at which to insert an empty row into the "newWords" and "newClues" arrays.
     */
    const addRow = (index) => {
        const newValues = [...newWords];
        const newCluesValues = [...newClues];
        newValues.splice(index + 1, 0, "");
        newCluesValues.splice(index + 1, 0, "");
        setNewWords(newValues);
        setNewClues(newCluesValues);
    };

    /**
     * This method removes a row from the crossword board
     * It clones the current state of newWords and newClues into newValues and newCluesValues using spread syntax.
     * It then uses splice to remove an element from each of those cloned arrays at the specified index.
     * Finally, it updates state for newWords and newClues with the modified cloned arrays.
     * @param index Specifies the index of the row to be removed from the "newWords" and "newClues" arrays.
     */
    const removeRow = (index) => {
        const newValues = [...newWords];
        const newCluesValues = [...newClues];
        newValues.splice(index, 1);
        newCluesValues.splice(index, 1);
        setNewWords(newValues);
        setNewClues(newCluesValues);
    };

    /**
     * This method handles the submission of a crossword board to the backend server.
     * It starts by filtering out any empty or whitespace-only values from two arrays of words and clues.
     * When the lengths of the resulting arrays are not equal, it sets some state variables and opens a dialog box to indicate
     * that the crossword is not solvable. If the lengths are equal, it makes a POST request to the backend with the words,
     * clues, and a level name. If the response from the server is "VALID CROSSWORD", it sets some state variables and opens
     * a dialog box to indicate that the crossword is solvable. If the response is anything else, it sets some state variables
     * and opens a dialog box to indicate that the crossword is not solvable.
     */
    const submitBoard = () => {
        const wordsArr = Array.from(newWords).filter((word) => word.trim() !== "");
        const cluesArr = Array.from(newClues).filter((clue) => clue.trim() !== "");

        if (wordsArr.length !== cluesArr.length) {
            setButtonClicked(true);
            setOpen(true);
            setIsSolvable(false);
        } else {axios
                .post(process.env.REACT_APP_BACKEND_URL + "create-crossword", {
                    words: wordsArr,
                    clues: cluesArr,
                    levelName: levelName,
                })
                .then((res) => {
                    if (res.data === "VALID CROSSWORD") {
                        setButtonClicked(true);
                        setOpen(true);
                        setIsSolvable(true);
                    }
                    else {
                        setButtonClicked(true);
                        setOpen(true);
                        setIsSolvable(false);
                    }
                });
        }
    };

    /**
     * Returns the html code for the create crossword web page.
     */
    return <div className={styles["page-wrapper"]}>
        <BackButton redirectUrl="/other-games-page"/>
            <div className={styles["title"]}>Create your own Crossword</div>
             <div className={styles["description"]}>
                 Welcome to the Create Crossword webpage! Here, you can design your own crossword puzzle by filling in the word boxes and their corresponding clue boxes.
                 <br></br>
                 <br></br>
                 To get started, simply click on a word box and type in your desired word. Then, click on the clue box and enter a hint for the word you just typed. Repeat this process until you have entered all the words and clues for your crossword.
                 <br></br>
                 <br></br>
                 If you make a mistake or change your mind about a word, simply click on the remove button in the shape of a minus to delete the corresponding row.
                 Need more space? No problem! Just click on the add row button in the sign of a plus, which will add a row below the buttons corresponding row.
                 <br></br>
                 <br></br>
                 Once you have completed your crossword puzzle, click on the generate button to see the final product. You can also save your puzzle for future use or share it with friends and family.
                 Have fun creating your very own crossword puzzle!</div>
            <div className={styles["form-area"]}>
                <div className={styles["label-description"]}>
                    <label htmlFor="levelName">Level Name*</label>
                </div>
                <input
                    type="text"
                    className={`${styles["form-control"]} ${styles["word"]} `}
                    id="levelName"
                    value={levelName}
                    onChange={changeLevelName}
                    placeholder="Level 1000"
                    required
                />
            </div>
        <div className={`${styles["form-group"]} ${styles["new-words-container"]}`}>
            {newWords.map((word, index) => (
                <div key={index} className="new-row">
                    <button
                        onClick={() => addRow(index)}
                        className={`${styles["form-control"]} ${styles["add"]} ${styles["row"]}`}
                    >
                        +
                    </button>
                    {newWords.length > 1 && (
                        <button
                            onClick={() => removeRow(index)}
                            className={`${styles["form-control"]} ${styles["add"]} ${styles["row"]}`}
                        >
                            -
                        </button>
                    )}
                    <input
                        type="text"
                        className={`${styles["form-control"]} ${styles["row"]} ${styles["word"]} `}
                        value={newWords[index]}
                        onChange={(e) => {
                            const newValues = [...newWords];
                            newValues[index] = e.target.value;
                            setNewWords(newValues);
                        }}
                        placeholder={`Word #${index + 1}`}
                        pattern="[A-Za-z]+"
                    />
                    <input
                        type="text"
                        className={`${styles["form-control"]} ${styles["clue"]}`}
                        value={newClues[index]}
                        onChange={(e) => {
                            const newValues = [...newClues];
                            newValues[index] = e.target.value;
                            setNewClues(newValues);
                        }}
                        placeholder={`Clue #${index + 1}`}
                        pattern="[A-Za-z]+"
                    />
                </div>
            ))}
        </div>
        <div>
                <button
                    type="button"
                    id={styles["create-button"]}
                    className="btn btn-secondary btn-lg"
                    onClick={(event) => submitBoard()}
                >
                    Create Crossword Puzzle
                </button>
            {buttonClicked && (isSolvable ? <MessageBox message="Crossword has been Created."
                                                        buttons={validButtons}
                                                        open={open}
                                                        setOpen={setOpen} /> :
                <MessageBox message="Crossword is not Valid."
                            buttons={invalidButtons}
                            open={open}
                            setOpen={setOpen} />)}
            </div>
        </div>

}
