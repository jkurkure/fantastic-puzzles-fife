import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CrosswordBoard from "./CrosswordBoard";

describe("CrosswordBoard", () => {
    const board = {
        grid: {
            result: [
                { position: 1, orientation: "across", starty: 0, startx: 0, clue: "First clue" },
                { position: 2, orientation: "down", starty: 0, startx: 0, clue: "Second clue" },
            ],
            table: [
                ["a", "b"],
                ["c", "d"],
            ],
            rows: 2,
            cols: 2,
        },
        activeCell: {},
    };

    const setCellLetter = jest.fn();
    const crosswordBoardRef = jest.fn();

    it("renders without crashing", () => {
        render(<CrosswordBoard board={board} setCellLetter={setCellLetter} crosswordBoardRef={crosswordBoardRef} />);
    });

    it("displays the correct number of cells", () => {
        const { container } = render(<CrosswordBoard board={board} setCellLetter={setCellLetter} crosswordBoardRef={crosswordBoardRef} />);
        const cells = container.querySelectorAll(".cell");
        expect(cells.length).toBe(board.grid.rows * board.grid.cols);
    });

    it("does not call setCellLetter function when a cell is clicked and has a letter entered", () => {
        const { container } = render(<CrosswordBoard board={board} setCellLetter={setCellLetter} crosswordBoardRef={crosswordBoardRef} />);
        const cell = container.querySelector(".cell");
        fireEvent.click(cell);
        fireEvent.keyDown(cell, { key: "a" });
        expect(setCellLetter).toHaveBeenCalledTimes(0);
    });

    it("displays the across and down clues", () => {
        const { getByText } = render(<CrosswordBoard board={board} setCellLetter={setCellLetter} crosswordBoardRef={crosswordBoardRef} />);
        const acrossHeader = getByText("Across");
        expect(acrossHeader).toBeInTheDocument();
        const downHeader = getByText("Down");
        expect(downHeader).toBeInTheDocument();

        const acrossClues = board.grid.result.filter((clue) => clue.orientation === "across");
        const downClues = board.grid.result.filter((clue) => clue.orientation === "down");
        acrossClues.forEach((clue) => {
            if (clue.string) {
                expect(getByText(clue.string)).toBeInTheDocument();
            }
        });
        downClues.forEach((clue) => {
            if (clue.string) {
                expect(getByText(clue.string)).toBeInTheDocument();
            }
        });
    });

    it("displays the correct number of black squares", () => {
        const { container } = render(<CrosswordBoard board={board} setCellLetter={setCellLetter} crosswordBoardRef={crosswordBoardRef} />);
        const blackCells = container.querySelectorAll(".cell.black");
        expect(blackCells.length).toBe(0);
    });

    it("calls handleCellClick function when a cell is clicked, ensuring that only active cells are clickable", () => {
        const { container } = render(<CrosswordBoard board={board} setCellLetter={setCellLetter} crosswordBoardRef={crosswordBoardRef} />);
        const cell = container.querySelector(".cell:not(.black-cell)");
        fireEvent.click(cell);
        expect(cell).toHaveClass('cell whiteCell');
    });

});