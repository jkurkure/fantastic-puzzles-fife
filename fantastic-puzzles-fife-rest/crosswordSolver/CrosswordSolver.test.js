const CrosswordSolver = require('../crosswordSolver/CrosswordSolver');

test('Fails as there is word overlap and also a letter is submitted', () => {
    let words = ['hello', 'heaven', 'inspiring', 'e'];
    let clues = [
        "A common greeting used to say hi.",
        "A place of happiness and glistening peace above our very clouds.",
        "Something that motivates or encourages others to do something positive.",
        "The letter 'e'."
    ];


    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(false);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(false);
    expect(solver.checkCrosswordValidity()).toBe('One or more words are too short (must be at least two letters)');
    expect(solver.calculateDifficulty()).toBe("EASY");
});

test('Fails as there is word overlap', () => {
    let words = ['hello', 'hell', 'inspiring', 'fascinating'];
    let clues = [
        "A common greeting used to say hi.",
        "A place of villainy and terrible pity under our very crust.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it."
    ];


    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(false);
    expect(solver.checkCrosswordValidity()).toBe('One or more words is a substring of another word');
    expect(solver.calculateDifficulty()).toBe("EASY");
});

test('Fails as there are duplicate words, and thus word overlap', () => {
    let words = ['hello', 'hello', 'inspiring', 'fascinating'];
    let clues = [
        "A common greeting used to say hi.",
        "A common greeting used to say hi.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it."
    ];


    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(false);
    expect(solver.checkWordOverlap()).toBe(false);
    expect(solver.checkCrosswordValidity()).toBe('One or more words are repeated');
    expect(solver.calculateDifficulty()).toBe("EASY");
});

test('Fails crossword creation to database due to' +
    'incorrect number of clue-word pairings', () => {
    let words = ['hello', 'greetings', 'inspiring'];
    let clues = [
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it."
    ];
    try {
        new CrosswordSolver(words, clues);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Words and clues arrays must be of the same length.');
    }
});

test('Fails crossword creation to database due to' +
    'incorrect number of word-clue pairings', () => {
    let words = ['hello', 'greetings', 'inspiring', 'fascinating'];
    let clues = [
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive."
    ];
    try {
        new CrosswordSolver(words, clues);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Words and clues arrays must be of the same length.');
    }
});

test('Correctly creates an easy crossword board', () => {
    let words = ['hello', 'greetings', 'inspiring', 'fascinating'];
    let clues = [
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it."
    ];


    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(true)
    expect(solver.checkCrosswordValidity()).toBe('VALID');
    expect(solver.calculateDifficulty()).toBe("EASY");
});

test('Correctly creates a medium crossword board', () => {
    let words = ['hello', 'greetings', 'inspiring', 'fascinating', 'delightful', 'enchanting'];
    let clues = [
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it.",
        "Something that is very pleasant and enjoyable to experience or encounter.",
        "Something that has a magical or captivating quality that fascinates or allures."
    ];

    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(true);
    expect(solver.checkCrosswordValidity()).toBe('VALID');
    expect(solver.calculateDifficulty()).toBe("MEDIUM");
});

test('Correctly creates a hard crossword board', () => {
    let words = ['hello', 'greetings', 'inspiring', 'fascinating',
        'delightful', 'enchanting', 'mesmerizing', 'exquisite'];
    let clues = [
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it.",
        "Something that is very pleasant and enjoyable to experience or encounter.",
        "Something that has a magical or captivating quality that fascinates or allures.",
        "Something that has a hypnotic or spellbinding effect, making you unable to look away.",
        "Something that is extremely beautiful or refined, often in a delicate or intricate way."
    ];


    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(true);
    expect(solver.checkCrosswordValidity()).toBe('VALID');
    expect(solver.calculateDifficulty()).toBe("HARD");
});

test('Correctly creates a very hard crossword board', () => {
    let words = ['hello', 'greetings', 'inspiring', 'fascinating', 'delightful', 'enchanting', 'mesmerizing', 'exquisite', 'nostalgia', 'bittersweet'];
    let clues = [
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it.",
        "Something that is very pleasant and enjoyable to experience or encounter.",
        "Something that has a magical or captivating quality that fascinates or allures.",
        "Something that has a hypnotic or spellbinding effect, making you unable to look away.",
        "Something that is extremely beautiful or refined, often in a delicate or intricate way.",
        "A feeling of longing or affection for the past, often tinged with sadness.",
        "A mixture of both pleasure and pain or sadness, often experienced when recalling a fond memory or leaving a special place."
    ];


    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(true);
    expect(solver.checkCrosswordValidity()).toBe('VALID');
    expect(solver.calculateDifficulty()).toBe("VERY HARD");
});

test('Correctly creates an extreme crossword board', () => {
    let words = [
        'whimsical',
        'resilient',
        'ephemeral',
        'surreal',
        'hello',
        'greetings',
        'inspiring',
        'fascinating',
        'delightful',
        'enchanting',
        'mesmerizing',
        'exquisite',
        'nostalgia',
        'bittersweet'
    ];

    let clues = [
        "Playful, quaint, or fanciful, often in an appealing or amusing way.",
        "Able to recover quickly from difficult situations or setbacks, showing toughness and adaptability.",
        "Lasting for only a short time, transient, fleeting, or impermanent.",
        "Having a dreamlike or otherworldly quality that is strange, unreal, or fantastic.",
        "A common greeting used to say hi.",
        "Another word for saying hello or showing respect.",
        "Something that motivates or encourages others to do something positive.",
        "Something that captures your attention or curiosity and makes you want to learn more about it.",
        "Something that is very pleasant and enjoyable to experience or encounter.",
        "Something that has a magical or captivating quality that fascinates or allures.",
        "Something that has a hypnotic or spellbinding effect, making you unable to look away.",
        "Something that is extremely beautiful or refined, often in a delicate or intricate way.",
        "A feeling of longing or affection for the past, often tinged with sadness.",
        "A mixture of both pleasure and pain or sadness, often experienced when recalling a fond memory or leaving a special place."
    ];

    let solver = new CrosswordSolver(words, clues);

    expect(solver.checkWordLength()).toBe(true);
    expect(solver.checkWordUniqueness()).toBe(true);
    expect(solver.checkWordOverlap()).toBe(true);
    expect(solver.checkCrosswordValidity()).toBe('VALID');
    expect(solver.calculateDifficulty()).toBe("EXTREME");
});
