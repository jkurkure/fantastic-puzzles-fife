import styles from "./CrosswordBoard.module.scss";
import Cell from "../cell/Cell";
import { useEffect, useState } from "react";

/**
 * A component for displaying a crossword board.
 * @param board The board to play on.
 */
export default function CrosswordBoard({ board, setCellLetter, crosswordBoardRef}) {
    const [boardFields, setBoardFields] = useState([]);
    const acrossClues = board.grid.result.filter((clue) => clue.orientation === "across");
    const downClues = board.grid.result.filter((clue) => clue.orientation === "down");

    /**
     * Sets the fields of the boards upon user input.
     */
    useEffect(() => {
        setBoardFields(loadFields(board, setCellLetter));
    }, [board, setCellLetter, crosswordBoardRef]);

    /**
     * Loads the fields of the crossword board, filling up the grid to be displayed.
     * @param board The board data to set.
     * @param setCellLetter The setter for each cell letter.
     * @returns {*[]} The 2D array of the board.
     */
    function loadFields(board, setCellLetter) {
        const cells = [];
        if (!board.grid.table) {
            console.log("Board table is not defined");
            return cells;
        }
        const startCells = new Map();
        const startClues = new Map();
        for (let i = 0; i < board.grid.result.length; i++) {
            const number = board.grid.result[i].position;
            const orientation = board.grid.result[i].orientation;
            const row = board.grid.result[i].starty;
            const col = board.grid.result[i].startx;
            const clue = board.grid.result[i].clue;
            startCells.set(`${row}-${col}-${orientation}`, number);
            startClues.set(`${row}-${col}-${orientation}`, clue);
        }
        for (let row = 0; row < board.grid.rows; row++) {
            for (let col = 0; col < board.grid.cols; col++) {
                const cellValue = board.grid.table[row][col];
                const isBlack = !/^[a-z]$/i.test(cellValue);
                const cellID = `${row + 1}-${col + 1}`; // create a unique ID for the cell
                const cellAcrossCheck = cellID + '-across';
                const cellDownCheck = cellID + '-down';
                let wordNumber = null;
                let clueValue = null;
                if (startCells.get(cellAcrossCheck)) {
                    wordNumber = startCells.get(cellAcrossCheck);
                    clueValue = startClues.get(cellAcrossCheck);
                } else if (startCells.get(cellDownCheck)) {
                    wordNumber = startCells.get(cellDownCheck);
                    clueValue = startClues.get(cellDownCheck);
                }
                const handleCellClick = () => {
                    // handle cell click
                };

                const handleCellKeyDown = (event) => {
                    if (!isBlack && /^[a-zA-Z]+$/.test(event.key)) {
                        // allow only single character
                        setCellLetter(row, col, event.key.toUpperCase());
                    }
                };

                const cellComponent = (
                    <Cell
                        key={cellID}
                        isBlack={isBlack}
                        isActive={board.activeCell?.row === row && board.activeCell?.col === col}
                        onClick={handleCellClick}
                        onKeyDown={handleCellKeyDown}
                        setCellLetter={setCellLetter} // pass down the function as a prop
                        row={row}
                        col={col}
                        wordNumber={wordNumber}
                        clue={clueValue}
                    >
                        <div className="number">{wordNumber}</div>
                        <div className="popup">{clueValue}</div>
                    </Cell>
                );
                cells.push(cellComponent);
            }
        }
        return cells;
    }

    /**
     * The html code to load a crossword board.
     */
    return (
        <div className={styles["board-container"]}>
            <div
                ref={crosswordBoardRef}
                className={styles["board"]}
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${board.grid.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${board.grid.rows}, 1fr)`,
                }}
            >
                {boardFields}
            </div>
            <div className={styles["clues"]}>
                <div>
                    <h3>Across</h3>
                    <ol>
                        {acrossClues.map((clue) => (
                            <div key={clue.position}>
                                <span>{clue.position}. </span>
                                {clue.clue}
                            </div>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Down</h3>
                    <ol>
                        {downClues.map((clue) => (
                            <div key={clue.position}>
                                <span>{clue.position}. </span>
                                {clue.clue}
                            </div>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
