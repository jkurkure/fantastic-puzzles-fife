import React from "react";
import styles from "./DownloadPuzzle.module.scss";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
//import { saveAs } from "file-saver";
import axios from "axios";

/**
 * Enables users to download a Sudoku puzzle int he defined Supergroup
 * Schema as a JSON file.
 * @param levelID The level ID of the puzzle to download.
 * @returns {JSX.Element} Returns the html code for the website.
 */
export default function DownloadPuzzle({ levelID }) {

    /**
     * Performs the action of downloading a specific puzzle in the specified
     * Supergroup JSON format. THis enables cross-website uploading for
     * Sudoku levels.
     */
    const downloadPuzzle = () => {
        console.log(levelID)
        // Make a GET request to the backend endpoint that will return the puzzle data as a JSON object
        axios.post(process.env.REACT_APP_BACKEND_URL + "download-puzzle", {levelID})
            .then(
            res => {
                /// Replace all 0 values with null in the puzzle array
                const modifiedPuzzle = res.data.data.puzzle.map(row =>
                    row.map(cell => cell === 0 ? null : cell.toString())
                );
                const modifiedSolution = res.data.data.solution.map(row =>
                    row.map(cell => cell === 0 ? null : cell.toString())
                );
                // Create a new object with the modified puzzle data
                const modifiedData = { ...res.data.data, puzzle: modifiedPuzzle, solution: modifiedSolution };
                // Convert the puzzle data into a Blob object
                const blob = new Blob([JSON.stringify({ ...res.data, data: modifiedData }, null, 2)], {
                    type: "application/json",
                });

                // Use the FileSaver package to download the JSON file
                saveAs(blob, `${res.data.name}.json`);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /**
     * The html code for the download component.
     */
    return (
        <div className={styles["wrapper"]}>
            <button
                type="button"
                id={styles["check-button"]}
                className="btn btn-secondary btn-lg"
                onClick={downloadPuzzle}
            >
                Download {levelID}
            </button>
        </div>
    );
}
