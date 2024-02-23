import React, { useRef, useEffect } from "react";
import styles from "./Cell.module.scss";

/**
 * This file is responsible for returning the html for a cell.
 * A crossword board is made up of cells. As it is an X by Y grid,
 * some cells are redundant whilst the remaining can have letters typed
 * into them.
 * @param isBlack If the cell is redundant.
 * @param isActive If the cell has a letter associated with it.
 * @param onClick If a cell can be clicked.
 * @param row The row of the cell.
 * @param col The column of the cell.
 * @param wordNumber The clue number of the cell if it has one.
 * @param clue The clue associated with the cell.
 * @returns {JSX.Element} The html code for the Cell.
 */
export default function Cell({isBlack, isActive, onClick, row, col, wordNumber, clue}) {
    const cellRef = useRef(null);

    /**
     * The use effect for this to decide if a cell is currently in use at all times.
     */
    useEffect(() => {
        if (isActive && cellRef.current) {
            cellRef.current.focus();
        }
    }, [isActive]);

    /**
     * Handles keyboard input for a single cell.
     * @param event The keyboard event.
     */
    const handleInput = (event) => {
        const input = event.target.textContent.trim().toUpperCase();
        if (/^[A-Z]$/.test(input)) {
            event.target.textContent = input;
        } else {
            event.target.textContent = "";
        }
    };

    /**
     * The html code for a single cell within a crossword board.
     */
    return (
        <div
            ref={cellRef}
            className={`${styles.cell} ${
                isBlack ? styles.blackCell : styles.whiteCell
            }`}
            onClick={onClick}
            tabIndex={!isBlack ? "0" : null}
            contentEditable={!isBlack}
            suppressContentEditableWarning // suppress the warning about using contentEditable
            onInput={handleInput}
            data-row={row}
            data-col={col}
            data-word-number={wordNumber}
            data-clue={clue}
        >
        </div>
    );
}
