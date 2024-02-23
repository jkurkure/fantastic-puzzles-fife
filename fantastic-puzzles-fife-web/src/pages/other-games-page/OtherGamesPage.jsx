import styles from "./OtherGamesPage.module.scss"
import MaterialDesignCard from "../../components/material-design-card/MaterialDesignCard";
import LogOutButton from "../../components/log-out-button/LogOutButton";
import BackButton from "../../components/back-button/BackButton";

// front-end page for the other games page.
/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function OtherGames() {
    return <div id={styles["home-page-wrapper"]}>
        <BackButton redirectUrl="/"/>
        <LogOutButton/>
        <div className={styles["title"]}> Other Games</div>
        <div className={styles["wrap"]}>
            <MaterialDesignCard cardTitle="Crossword Levels" redirectUrl="/crossword-levels"
                                backgroundImagePath="/crossword-newspaper.jpg"
                                content="Step into the world of crossword puzzles!"
                                longContent="A crossword puzzle offers a challenging, yet fun way to test your vocabulary and improve your problem solving skills"/>
            <MaterialDesignCard cardTitle="Sliding Puzzle Levels" redirectUrl="/sliding-levels"
                                backgroundImagePath="/sliding-puzzle.jpg"
                                content="Slide into the world of sliding tiles"
                                longContent="The classic puzzle game of sliding tiles! Test your skills and mind with a wide range of puzzles."/>
            <MaterialDesignCard cardTitle="Wordsearch Levels" redirectUrl="/wordsearch-levels"
                                backgroundImagePath="/word-search.jpg"
                                content="Unleash your inner detective with some wordsearch puzzles"
                                longContent="Find the hidden words in the grid! It is endless fun for word lovers of all levels."/>
            <MaterialDesignCard cardTitle="Play word guesser!" redirectUrl="/word-guesser"
                                backgroundImagePath="/word-guess.jpg"
                                content="Discover the word wizard in you!"
                                longContent="You must combine words to form a chain of thought. Challenge your vocabulary and test your spelling skills."/>
        </div>
        <div className={styles["wrap"]}>
            <MaterialDesignCard cardTitle="Crossword Creator" redirectUrl="/create-crossword"
                                backgroundImagePath="/crossword-writer.jpg"
                                content="Create your own crossword"
                                longContent=""/>
            <MaterialDesignCard cardTitle="Sliding Puzzle Creator" redirectUrl="/create-sliding-puzzle"
                                backgroundImagePath="/sliding-puzzle-2.jpg"
                                content="Slide into the world of sliding tiles"
                                longContent=""/>
            <MaterialDesignCard cardTitle="Wordsearch Creator" redirectUrl="/create-wordsearch"
                                backgroundImagePath="/wordsearch-creator.jpg"
                                content="Add your own word"
                                longContent=""/>
        </div>
    </div>
}
