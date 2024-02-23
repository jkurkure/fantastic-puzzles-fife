const SudokuSolver = require('../sudokuSolver/SudokuSolver');

test('Solve a correct easy board', () => {
    let board = [
        [0, 3, 4, 0, 7, 0, 0, 1, 0],
        [6, 0, 0, 1, 9, 0, 3, 4, 8],
        [0, 9, 8, 0, 0, 2, 5, 6, 7],
        [8, 5, 0, 7, 6, 1, 0, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [0, 1, 0, 9, 2, 4, 8, 5, 0],
        [9, 0, 1, 0, 3, 0, 2, 8, 4],
        [0, 0, 7, 4, 0, 9, 6, 3, 5],
        [0, 0, 5, 2, 8, 6, 0, 7, 9]
    ];

    let solver = new SudokuSolver(9, board);

    let actualSolution = solver.getSolution();

    let expectedSolution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    expect(solver.isValidBoard()).toBe(true);
    expect(solver.getNumberOfSolutions()).toBe(1);
    expect(solver.getDifficulty()).toBe("EASY");
    expect(actualSolution).toStrictEqual(expectedSolution);
});

test('Solve a correct difficult (EXPERT) board with 19 clues', () => {
    // takes around 11 seconds
    let board = [
        [0, 6, 0, 0, 0, 0, 1, 5, 0],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);

    let actualSolution = solver.getSolution();

    let expectedSolution = [
        [7, 6, 4, 9, 8, 2, 1, 5, 3],
        [3, 8, 1, 4, 7, 5, 2, 6, 9],
        [9, 2, 5, 1, 3, 6, 4, 8, 7],
        [4, 3, 7, 5, 2, 8, 9, 1, 6],
        [2, 1, 8, 6, 9, 3, 5, 7, 4],
        [6, 5, 9, 7, 1, 4, 3, 2, 8],
        [8, 4, 3, 2, 6, 1, 7, 9, 5],
        [5, 9, 2, 8, 4, 7, 6, 3, 1],
        [1, 7, 6, 3, 5, 9, 8, 4, 2]
    ];
    expect(solver.isValidBoard()).toBe(true);
    expect(solver.getNumberOfSolutions()).toBe(1);
    expect(solver.getDifficulty()).toBe("EXPERT");
    expect(actualSolution).toStrictEqual(expectedSolution);
});

test('Solve a correct difficult (EXPERT) board with 18 clues', () => {
    // takes around 55 seconds to run
    let board = [
        [0, 6, 0, 0, 0, 0, 1, 0, 0],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);

    let actualSolution = solver.getSolution();

    let expectedSolution = [
        [7, 6, 4, 9, 8, 2, 1, 5, 3],
        [3, 8, 1, 4, 7, 5, 2, 6, 9],
        [9, 2, 5, 1, 3, 6, 4, 8, 7],
        [4, 3, 7, 5, 2, 8, 9, 1, 6],
        [2, 1, 8, 6, 9, 3, 5, 7, 4],
        [6, 5, 9, 7, 1, 4, 3, 2, 8],
        [8, 4, 3, 2, 6, 1, 7, 9, 5],
        [5, 9, 2, 8, 4, 7, 6, 3, 1],
        [1, 7, 6, 3, 5, 9, 8, 4, 2]
    ];
    expect(solver.isValidBoard()).toBe(true);
    expect(solver.getNumberOfSolutions()).toBe(1);
    expect(solver.getDifficulty()).toBe("EXPERT");
    expect(actualSolution).toStrictEqual(expectedSolution);
});

test('Solve a correct difficult (EXPERT) board with 17 clues', () => {
    // takes around 400 seconds to run
    let board = [
        [0, 6, 0, 0, 0, 0, 1, 0, 0],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 0],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);

    let actualSolution = solver.getSolution();

    let expectedSolution = [
        [7, 6, 4, 9, 8, 2, 1, 5, 3],
        [3, 8, 1, 4, 7, 5, 2, 6, 9],
        [9, 2, 5, 1, 3, 6, 4, 8, 7],
        [4, 3, 7, 5, 2, 8, 9, 1, 6],
        [2, 1, 8, 6, 9, 3, 5, 7, 4],
        [6, 5, 9, 7, 1, 4, 3, 2, 8],
        [8, 4, 3, 2, 6, 1, 7, 9, 5],
        [5, 9, 2, 8, 4, 7, 6, 3, 1],
        [1, 7, 6, 3, 5, 9, 8, 4, 2]
    ];
    expect(solver.isValidBoard()).toBe(true);
    expect(solver.getNumberOfSolutions()).toBe(1);
    expect(solver.getDifficulty()).toBe("EXPERT");
    expect(actualSolution).toStrictEqual(expectedSolution);
});

test('A board with a non number value is invalid', () => {
    let board = [
        [0, 6, 0, 0, 0, 0, 1, 0, 0],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, "a", 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    expect(solver.isValidBoard()).toBeFalsy();
});

test('A board with a number that is not an integer value is invalid', () => {
    let board = [
        [0, 6, 0, 0, 0, 0, 1, 0, 0],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0.3, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    expect(solver.isValidBoard()).toBeFalsy();
});

test('A board with less than 17 clues is invalid', () => {
    // board with 16 clues
    let board = [
        [0, 6, 0, 0, 0, 0, 1, 0, 0],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0.3, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    expect(solver.isValidBoard()).toBeFalsy();
});

test('A board with 2 equal numbers in the same 3x3 box is invalid', () => {
    // cell 0,0 and 0,2 are equal in the first box
    let board = [
        [7, 6, 0, 0, 0, 0, 1, 5, 3],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 7, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    expect(solver.isValidBoard()).toBeFalsy();
});

test('A board with 2 equal numbers in the same row is invalid', () => {
    // cell 4,1 and 4,8 are both equal to 1
    let board = [
        [7, 6, 0, 0, 0, 0, 1, 5, 3],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 0, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 7, 0, 0],
        [5, 0, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    expect(solver.isValidBoard()).toBeFalsy();
});

test('A board with 2 equal numbers in the same column is invalid', () => {
    // cells 0,1 and 7,1 are both equal to 6
    let board = [
        [7, 6, 0, 0, 0, 0, 1, 5, 3],
        [3, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 0, 7],
        [4, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 7, 0, 0],
        [5, 6, 2, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    expect(solver.isValidBoard()).toBeFalsy();
});

test('A board with multiple solutions is invalid', () => {
    let board = [
        [1, 2, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 3],
        [2, 3, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 3, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 3, 1],
        [3, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 1, 2]
    ];

    let solver = new SudokuSolver(9, board);
    // the board is valid, at the initial checks
    expect(solver.isValidBoard()).toBeTruthy();
    expect(solver.getNumberOfSolutions()).toBe(2);
    expect(solver.getDifficulty()).toBe("MEDIUM");
});

test('A board with multiple solutions is invalid. Exactly 2 solutions', () => {
    // test board taken from https://puzzling.stackexchange.com/questions/67789/examples-of-sudokus-with-two-solutions (posted by user27014, last accessed on 1 Nov 2022)
    let board = [
        [2, 9, 5, 7, 4, 3, 8, 6, 1],
        [4, 3, 1, 8, 6, 5, 9, 0, 0],
        [8, 7, 6, 1, 9, 2, 5, 4, 3],
        [3, 8, 7, 4, 5, 9, 2, 1, 6],
        [6, 1, 2, 3, 8, 7, 4, 9, 5],
        [5, 4, 9, 2, 1, 6, 7, 3, 8],
        [7, 6, 3, 5, 2, 4, 1, 8, 9],
        [9, 2, 8, 6, 7, 1, 3, 5, 4],
        [1, 5, 4, 9, 3, 8, 6, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    // the board is valid, at the initial checks
    expect(solver.isValidBoard()).toBeTruthy();
    expect(solver.getNumberOfSolutions()).toBe(2);
    expect(solver.getDifficulty()).toBe("EASY");
});

test('A board with multiple solutions is invalid. Test a hard level returns HARD', () => {
    let board = [
        [1, 2, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 3],
        [2, 3, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 3, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 3, 1],
        [3, 1, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    // the board is valid, at the initial checks
    expect(solver.isValidBoard()).toBeTruthy();
    expect(solver.getNumberOfSolutions()).toBe(2);
    expect(solver.getDifficulty()).toBe("HARD");
});

test('Solve a correct hard board', () => {
    // Board taken from https://www.sudokuwiki.org/Weekly_Sudoku.asp (#521, October 29 - November 4, 2022:
    // The Weekly Extreme 'Unsolveable' Sudoku Puzzle, by Richard Kröger, guest compiler, [Link Last Accessed on 1 Nov 2022])
    let board = [
        [0, 0, 2, 0, 0, 0, 0, 0, 4],
        [0, 3, 0, 0, 6, 0, 0, 1, 0],
        [4, 0, 0, 5, 0, 0, 8, 0, 0],
        [0, 0, 0, 4, 0, 0, 0, 0, 0],
        [0, 5, 0, 0, 0, 8, 9, 0, 0],
        [6, 0, 0, 0, 1, 0, 0, 7, 0],
        [0, 0, 9, 0, 0, 0, 0, 0, 2],
        [0, 1, 0, 0, 0, 3, 0, 0, 0],
        [8, 0, 0, 0, 7, 0, 6, 0, 0]
    ];

    let solver = new SudokuSolver(9, board);
    // the board is valid, at the initial checks
    expect(solver.isValidBoard()).toBeTruthy();
    expect(solver.getNumberOfSolutions()).toBe(1);
    expect(solver.getDifficulty()).toBe("HARD");
});

test('A board with no possible solution is invalid', () => {
    // Board taken from https://www.quora.com/Are-there-incomplete-impossible-Sudoku-puzzles-with-no-immediate-conflict-in-the-provided-squares
    // posted by Phil Scovis [Link last accessed on 1 Nov 2022]
    let board = [
        [2, 5, 6, 0, 4, 9, 8, 3, 7],
        [1, 8, 3, 5, 0, 7, 9, 6, 4],
        [9, 7, 4, 3, 8, 6, 2, 5, 1],
        [8, 4, 9, 1, 6, 2, 3, 7, 5],
        [5, 6, 2, 7, 9, 3, 4, 1, 8],
        [7, 3, 1, 4, 5, 8, 6, 2, 9],
        [6, 9, 7, 8, 3, 1, 5, 4, 2],
        [4, 2, 8, 6, 7, 5, 1, 9, 3],
        [3, 1, 5, 9, 2, 4, 7, 8, 6],
    ];

    let solver = new SudokuSolver(9, board);
    // the board is valid, at the initial checks
    expect(solver.isValidBoard()).toBeTruthy();
    expect(solver.getNumberOfSolutions()).toBe(0);
    expect(solver.getDifficulty()).toBe("EASY");
})
