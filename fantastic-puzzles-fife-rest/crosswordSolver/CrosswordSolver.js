const clg = require("crossword-layout-generator");

/**
 * This is responsible for the creation and solving methods
 * of a Crossword puzzle
 */
module.exports = class CrosswordSolver {

    // Constructor and other methods
    constructor(words, clues) {
        this.words = words;
        this.clues = clues;
        this.input = this.formatInput(words, clues);
        this.layout = clg.generateLayout(this.input);
        for (let i = 0; i < this.layout.length; i++) {
            let row = '';
            for (let j = 0; j < this.layout[i].length; j++) {
                let cell = this.layout[i][j];
                row += cell === '-' ? ' ' : cell;
                row += ' ';
            }
        }
    }

    getLayout() {
        return this.layout;
    }

    formatInput(words, clues) {
        if (words.length !== clues.length) {
            throw new Error("Words and clues arrays must be of the same length.");
        }

        const input = [];
        for (let i = 0; i < words.length; i++) {
            input.push({
                clue: clues[i],
                answer: words[i]
            });
        }

        return input;
    }

    calculateDifficulty() {
        const numWords = this.words.length;
        if (numWords < 5) {
            return 'EASY';
        } else if (numWords < 7) {
            return 'MEDIUM';
        } else if (numWords < 10) {
            return 'HARD';
        } else if (numWords < 13) {
            return 'VERY HARD';
        } else {
            return 'EXTREME';
        }
    }

    checkCrosswordValidity() {
        if (!this.checkWordLength(this.words)) {
            return "One or more words are too short (must be at least two letters)";
        }
        if (!this.checkWordUniqueness(this.words)) {
            return "One or more words are repeated";
        }
        if (!this.checkWordOverlap(this.words)) {
            return "One or more words is a substring of another word";
        }
        return "VALID";

    }

    // Check that all words have at least two letters
    checkWordLength() {
        return this.words.every((word) => word.length >= 2);
    }

    // Check that all words are unique
    checkWordUniqueness() {
        const uniqueWords = new Set(this.words);
        return uniqueWords.size === this.words.length;
    }

    // Check that no word is a substring of another word
    checkWordOverlap() {
        for (let i = 0; i < this.words.length; i++) {
            for (let j = 0; j < this.words.length; j++) {
                if (i !== j && this.words[i].includes(this.words[j])) {
                    return false;
                }
            }
        }
        return true;
    }

}