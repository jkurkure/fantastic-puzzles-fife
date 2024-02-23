import styles from "./SlidingGrid.module.scss";
import React from "react";

/**
 * 
 * @param {*} param0 tehs et x and y values, the board, the active cell.
 * @returns the html for the board.
 */
export default function SudokuBoard({setX, setY, board, setActiveCell, activeCell}) {
    const loadFields = () => {
        const cells = []
        // Loops for the number of rows.
        for (let row = 0; row < 3; row++) {
            // Loops for the number of columns.
            for (let column = 0; column < 3; column++) {
                let borderClass = styles["cell"];
                let cellComponent = <div
                    className={activeCell === row + " " + column ? borderClass + " " + styles["active-cell"] : borderClass}
                    id={row + " " + column} onClick={(event) => {
                    setX(row);
                    setY(column);
                    // If the selected cell is adjancent to a zero, their values are swapped.
                    if (row > 0 && board[row - 1][column] === 0) {
                        board[row - 1][column] = board[row][column];
                        board[row][column] = 0;
                    }
                    else if (row < 2 && board[row + 1][column] === 0) {
                        board[row + 1][column] = board[row][column];
                        board[row][column] = 0;
                    }
                    else if (column > 0 && board[row][column - 1] === 0) {
                        board[row][column - 1] = board[row][column];
                        board[row][column] = 0;
                    } 
                    else if (column < 2 && board[row][column + 1] === 0) {
                        board[row][column + 1] = board[row][column];
                        board[row][column] = 0;
                    } 
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