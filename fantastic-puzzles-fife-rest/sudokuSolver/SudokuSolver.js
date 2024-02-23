module.exports = class SudokuSolver {
    // class attributes
    rows;
    columns;
    boxes;
    board;
    solution;
    numberOfSolutions;
    validBoard = true;
    board_size;
    box_size;
    numberOfClues;

    /**
     * Method that creates an array to store the given values of the bord squares
     * and initialises the arrays used to check each, row, column or box with the
     * binary encoding of the values in each row/column/box.
     */
    constructor(board_size, board) {
        this.board_size = board_size;
        this.box_size = Math.floor(Math.sqrt(board_size));
        this.numberOfSolutions = 0;
        this.board = new Array(board_size).fill().map(() => Array(board_size).fill(0));
        for (let row = 0; row < board_size; ++row)
            for (let col = 0; col < board_size; ++col)
                this.board[row][col] = board[row][col];
        this.rows = new Array(board_size).fill(0);
        this.columns = new Array(board_size).fill(0);
        this.solution = new Array(board_size).fill().map(() => Array(board_size).fill(0));
        this.boxes = new Array(board_size).fill(this.box_size).map(() => Array(this.box_size).fill(0));
        this.initializeCheckArrays();
        if (this.validBoard === true) {
            this.solve(0, 0);
        }
    }

    /**
     * Method that adds for each square value i: 2 to the power of i to the row,
     * column and box array in which the square is this is used to save memory and
     * time, we keep a number instead of 9 values. Checking if a number is already
     * in a row/column/box can be done in O(1).
     */

    initializeCheckArrays() {
        this.numberOfClues = 0;
        for (let row = 0; row < this.board_size; ++row)
            for (let col = 0; col < this.board_size; ++col) {
                let boardValue = this.board[row][col];
                if (boardValue !== 0)
                    this.numberOfClues++;

                // checking if the given board was invalid
                // (containing the same value in a row, column or 3x3 box).
                this.board[row][col] = 0;
                if ((((typeof boardValue === "number") && Number.isInteger(boardValue) === true) && boardValue >= 0 && boardValue <= 9) === false || (boardValue != 0 && this.isValidSquareValue(1 << (boardValue), row, col) === false)) {
                    this.validBoard = false;
                    break;
                }
                this.board[row][col] = boardValue;
                this.rows[row] |= (1 << boardValue);
                this.columns[col] |= (1 << boardValue);
                this.boxes[Math.floor(row / this.box_size)][Math.floor(col / this.box_size)] |= (1 << boardValue);
            }
        if (this.numberOfClues < 17) {
            this.validBoard = false;
        }
    }

    /**
     * Method that checks if we can add a value to a given square by checking if 2
     * to the power value is in the binary representation of the the row, column or
     * box coresponding to the square
     * @param value  the value that we try to add to the square
     * @param row    the row of the givem square
     * @param column the column of the given square
     * @return true if the value can be added to the square, false otherwise
     */
    isValidSquareValue(value, row, column) {
        if (this.board[row][column] !== 0)
            return false;
        else
            return ((value & this.rows[row]) === 0 && (value & this.columns[column]) === 0
                && (value & this.boxes[Math.floor(row / this.box_size)][Math.floor(column / this.box_size)]) === 0);
    }


    /**
     * Method that finds a solution (using backtracking) if it exists.
     * @param row    the current row of the square we are trying to complete
     * @param column the current column of the square we are trying to complete
     * @return true if the board is solvable and has more than 1 solution
     */
    solve(row, column) {
        if (this.numberOfSolutions === 2)
            return;
        let nextRow = row + Math.floor((column + 1) / this.board_size);
        let nextColumn = (column + 1) % this.board_size;
        // checking if we found a solution
        if (row === this.board_size) {
            this.numberOfSolutions++;
            for (let i = 0; i < this.board_size; ++i)
                for (let j = 0; j < this.board_size; ++j)
                    this.solution[i][j] = this.board[i][j];
            // if we have 2 solutions, it's redundant to search for more
            return;
        }
        // if the current square is already filled, we move to the next one
        if (this.board[row][column] !== 0) {
            this.solve(nextRow, nextColumn);
        } else {
            for (let i = 1; i <= this.board_size; ++i) {
                let value = (1 << i);
                if (this.isValidSquareValue(value, row, column)) {
                    // add the encoded value to its respective row, column, box
                    this.rows[row] |= value;
                    this.columns[column] |= value;
                    this.boxes[Math.floor(row / this.box_size)][Math.floor(column / this.box_size)] |= value;
                    // add the value to the square
                    this.board[row][column] = i;
                    // after choosing the value of this square we move on to the next square
                    this.solve(nextRow, nextColumn);
                    // terminate the search if we reached 2 solutions
                    if (this.numberOfSolutions === 2)
                        return;
                    // remove the value from the square
                    this.board[row][column] = 0;
                    // remove what was changed in the checking arrays for rows, columns and 3x3 boxes
                    this.rows[row] ^= value;
                    this.columns[column] ^= value;
                    this.boxes[Math.floor(row / this.box_size)][Math.floor(column / this.box_size)] ^= value;
                }
            }
        }
    }

    /**
     * Method that returns the difficulty of a level.
     * @returns {string} the difficulty of a level.
     */
    getDifficulty() {
        if (this.numberOfClues < 20) {
            return "EXPERT";
        } else if (this.numberOfClues < 24) {
            return "HARD";
        } else if (this.numberOfClues < 28) {
            return "MEDIUM";
        } else {
            return "EASY";
        }
    }

    /**
     * Method that returns a solution to the board
     * @return a solution to the board, or contains only zeroes if no solution is found
     */
    getSolution() {
        return this.solution;
    }

    /**
     * Method that returns the number of solutions to the Sudoku board
     * @return 0 if there is no solution, 1 if exactly 1 solution exists, 2 if there
     *         are at least 2 solutions
     */
    getNumberOfSolutions() {
        return this.numberOfSolutions;
    }

    /**
     * Method that return whether a board is valid after initial checks.
     * @returns {boolean} is true if the board if valid after initial checks, false otherwise
     */
    isValidBoard() {
        return this.validBoard;
    }

}