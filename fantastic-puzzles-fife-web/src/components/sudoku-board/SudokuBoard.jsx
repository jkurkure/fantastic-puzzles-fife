import styles from "./SudokuBoard.module.scss";
import React from "react";

/**
 * This component that represents the 9x9 sudoku grid. It highlights selected cells.
 * This is used to load in a JSON object of a sudoku game from the database and display
 * it on the webpage to be played.
 * Immutable cells have different colors (initial numbers when a level is loaded).
 * Different cells have different border types for styling purposes.
 * @param setX The setter for the X coordinate.
 * @param setY The setter for the Y coordinate.
 * @param board The board of the sudoku game as a 2D array.
 * @param isImmutable Immutability of a cell.
 * @param setActiveCell Setter for an active cell - does not have a number in it already.
 * @param activeCell The value of an active cell.
 * @returns {JSX.Element} The html to play a Sudoku game
 */
export default function SudokuBoard({setX, setY, board, isImmutable, setActiveCell, activeCell}) {
    const loadFields = () => {
        const cells = []
        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                let borderClass = styles["cell"];
                // set bold borders for 3x3 boxes
                if ((row + 1) % 3 === 0 && row !== 8)
                    borderClass = borderClass + " " + styles.bottomBorder;
                if ((column + 1) % 3 === 0 && column !== 8)
                    borderClass = borderClass + " " + styles.rightBorder;
                // immutable cells have different colors
                if (isImmutable !== undefined && isImmutable[row][column] === 1) {
                    borderClass = borderClass + " " + styles["immutable-cell"];
                }
                let cellComponent = <div
                    className={activeCell === row + " " + column ? borderClass + " " + styles["active-cell"] : borderClass}
                    id={row + " " + column} onClick={(event) => {
                    // set the active cells coordinates
                    setX(row);
                    setY(column);
                    setActiveCell(event.target.id);
                }
                }>{board[row][column] !== 0 ? board[row][column] : ""
                } </div>;
                cells.push(cellComponent)
            }
        }
        return cells
    }
    return <div id={styles["board"]}>{loadFields()}</div>
}