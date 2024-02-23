import styles from "./HomePage.module.scss"
import MaterialDesignCard from "../../components/material-design-card/MaterialDesignCard";
import LogOutButton from "../../components/log-out-button/LogOutButton";
import NavBar from "../../components/nav-bar/NavBar";
import SelectButton from "../../components/select-button/SelectButton";


// front-end page for the home page.
/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function HomePage() {
    return <div id={styles["home-page-wrapper"]}>
        <LogOutButton/>
        <div className={styles["title"]}> Fantastic Puzzles Fife</div>
        <div className={styles["wrap"]}>
            <MaterialDesignCard cardTitle="Play Sudoku" redirectUrl="/levels"
                                backgroundImagePath="/richard-bell-unsplash-play-sudoku.jpg"
                                content="Want to relax? You are in the right place!"
                                longContent="Play our original sudoku puzzles. There are 4 difficulty levels: EASY, MEDIUM, HARD, EXTREME. Pick a level, solve it and then pick another one. You know you want to."/>
            <MaterialDesignCard cardTitle="Create Your Own Sudoku" redirectUrl="/create-sudoku"
                                backgroundImagePath="/john-morgan-unsplash-sudoku-create.jpg"
                                content="In a creative mood today?"
                                longContent="Use our online tool to validate and create a new sudoku. After you create it you can also play it, or come back later and select it using the level selector. Beware, solving a sudoku board is not easy for the computer, the fewer clues you type, the more time it takes to validate."/>
            <MaterialDesignCard cardTitle="Play Other Games" backgroundImagePath="/other-games.png"
                                redirectUrl="/other-games-page"
                                content="A selection of other games including, crossword, word search, word guess"
                                longContent="Play and Create with our collection of puzzles"/>
        </div>
    </div>
}

// <SelectButton redirectUrl="/my-account" name={"My Account"}/>