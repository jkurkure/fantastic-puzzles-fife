import styles from "./SlidingGrid.module.scss";
import React from "react";

/**
 * 
 * @param {*} param0 gets the x and y variables and the active cell information.
 * @returns 
 */
export default function SudokuBoard({setX, setY, board, setActiveCell, activeCell}) {
    const loadFields = () => {
        const cells = []
        // Loops over the 3 rows.
        for (let row = 0; row < 3; row++) {
            // loops over the 3 columns.
            for (let column = 0; column < 3; column++) {
                let borderClass = styles["cell"];
                let cellComponent = <div
                    className={activeCell === row + " " + column ? borderClass + " " + styles["active-cell"] : borderClass}
                    id={row + " " + column} onClick={(event) => {
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