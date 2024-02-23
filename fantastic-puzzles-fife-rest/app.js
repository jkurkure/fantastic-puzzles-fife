const express = require('express');
require('dotenv').config();

const signinRouter = require('./routes/sign-in');
const signupRouter = require('./routes/sign-up');

const oauthRouter = require("./routes/oauth");
const superGroupUserRouter = require("./routes/user-api");
const generateCodeRouter = require("./routes/generate-code");
const wordSearchRouter = require("./routes/wordsearch");

const sudokuRouter = require('./routes/sudoku');
const levelRouter = require('./routes/level-selector');
const createSudokuRouter = require('./routes/create-sudoku');

const crosswordRouter = require('./routes/crossword');
const crosswordLevelRouter = require('./routes/crossword-selector');
const createCrosswordRouter = require('./routes/create-crossword');

const slidingPuzzleRouter = require('./routes/sliding-puzzle');
const slidingPuzzleLevelRouter = require('./routes/sliding-selector');
const createSlidingPuzzleRouter = require('./routes/create-sliding-puzzle');

const addCommentRouter = require('./routes/add-comment');
const commentSectionRouter = require('./routes/comment-section');

const downloadPuzzle = require('./download-puzzle/download-puzzle');

const wordGuesserRouter = require('./routes/word-guesser');

const cors = require('cors');
const app = express();

// middleware and cors
app.use(cors({origin: ["http://localhost:24086", "http://localhost:3000", "https://cs3099user01.host.cs.st-andrews.ac.uk", "https://cs3099user04.host.cs.st-andrews.ac.uk", "https://cs3099user02.host.cs.st-andrews.ac.uk", "https://cs3099user03.host.cs.st-andrews.ac.uk", "https://cs3099user05.host.cs.st-andrews.ac.uk", "https://cs3099user06.host.cs.st-andrews.ac.uk", "https://cs3099user07.host.cs.st-andrews.ac.uk", "https://cs3099user08.host.cs.st-andrews.ac.uk", "https://cs3099user09.host.cs.st-andrews.ac.uk"]}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// use the routes created
app.use('/sign-up', signupRouter);
app.use('/sign-in', signinRouter);

app.use('/sudoku', sudokuRouter);
app.use('/levels', levelRouter);
app.use('/create-sudoku', createSudokuRouter);

app.use('/sliding-puzzle', slidingPuzzleRouter);
app.use('/sliding-levels', slidingPuzzleLevelRouter);
app.use('/create-sliding-puzzle', createSlidingPuzzleRouter);

app.use('/crossword', crosswordRouter);
app.use('/crossword-levels', crosswordLevelRouter);
app.use('/create-crossword', createCrosswordRouter);

app.use('/generate-code', generateCodeRouter)
app.use('/oauth', oauthRouter);
app.use('/api/user', superGroupUserRouter);
app.use('/wordsearch', wordSearchRouter);

app.use('/add-comment', addCommentRouter);
app.use('/comment-section', commentSectionRouter);

app.use('/download-puzzle', downloadPuzzle);

app.use('/word-guesser', wordGuesserRouter);
module.exports = app;
