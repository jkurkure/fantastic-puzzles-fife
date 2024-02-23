import React, { useRef } from "react";
import styles from "./UploadPuzzle.module.scss";
import axios from "axios";

/**
 * This component is responsible for the uploading of a sudoku json file onto the database.
 * @returns {JSX.Element} The html code for button.
 */
export default function UploadPuzzle() {

    const fileInput = useRef(null);

    /**
     * Filters the key information of the JSON file and sends it to the back end.
     * If the puzzle can be solved, it is stored in the database and displayed on the
     * website.
     */
    const handleFileUpload = () => {
        const reader = new FileReader();
        reader.readAsText(fileInput.current.files[0]);

        // Reads in the input json file the user has chosen.
        reader.onload = () => {
            const puzzleData = JSON.parse(reader.result);
            const size = puzzleData.data.puzzle.length;
            const board = puzzleData.data.puzzle
                .map(row => row.map(cell => cell === null ? 0 : parseInt(cell)));

            let levelName = puzzleData.name;
            if (levelName === undefined) {
                levelName = fileInput.current.files[0].name;
            }
            levelName = levelName.replace(/\.json$/i, ""); // remove .json extension

            // Sends the filtered information of the sudoku puzzle to the backend to be solved
            axios.post(process.env.REACT_APP_BACKEND_URL + "create-sudoku", {
                size: size,
                board: board,
                levelName: levelName
            }).then(
                res => {
                    // redirect to the newly created level page if successful
                    if (res.data === "VALID BOARD"){
                        window.location.reload();
                    }
                }
            )
        }
    };

    /**
     * Returns the html code for the upload button component on a web page.
     */
    return (
        <div className={styles["wrapper"]}>
            <input type="file" ref={fileInput} style={{ display: 'none' }} accept=".json" onChange={handleFileUpload} />
            <button
                type="button"
                id={styles["check-button"]}
                className="btn btn-secondary btn-lg"
                onClick={() => fileInput.current.click()}
            >
                Upload Puzzle
            </button>
        </div>
    );
}
