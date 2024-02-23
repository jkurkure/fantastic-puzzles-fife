import React, {useState, useRef, useEffect} from "react";
import styles from "./OldWordGuesser.module.scss"
import FormInputArea from "../../components/form-input-element/FormInputArea";
import WordGuesserGrid from "../../components/word-guesser-grid/WordGuesserGrid";
import BackButton from "../../components/back-button/BackButton";
import MessageBox from "../../components/message-box/MessageBox";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import CommentBox from "../../components/comment-input/CommentInputBox";
import CommentSection from "../../components/comment-section/CommentSection";
import jwtDecode from "jwt-decode";

export default function OldWordGuesser() {


    //game variables
    const[solution, setSolution] = useState("") //solution 
    const [currentGuess, setCurrentGuess] = useState("") //current guess 
    const [strGuesses, setStrGuesses] = useState(new Set([])) // previous guesses also stored as strings in a set for error checking
    const [guesses, setGuesses] = useState([]); // previous guesses stored as a list of letter objects for rendering
    const [badLetters, setBadLetters] = useState(new Set([])) //letters that are known to be not be in the solution - stored in check for easy adding and checking
    const [isSolved, setIsSolved] = useState(false); //whether correct guess has been made (needed for endgame message box)
    const [formMessage, setFormMessage] = useState("") //message above submission form
    const [gameURL, setGameURL] = useState("") //url to play wordle for specific solution
    const [solutionVisible, setSolutionVisible] = useState(false) //whether the solution message box is visible or not
    const [urlVisible, setUrlVisible] = useState(false) //whether the message box containing the url to share the game is visible or not

  
    //use navigate hook instatiated for button navigation
    const navigate = useNavigate();

    //Regular expression pattern object for checking invalid characters
    const nonLetterChar = new RegExp('[^A-Za-z]')

    //Buttons for end game box messages
    const buttons = [
        {
            text: "Try same word again!",
            onClick: () => {
                navigate(gameURL.substring(gameURL.lastIndexOf('/') + 1)); //navigate to specific game URL page
            },
        },
        {
            text: "Try another word!",
            onClick: () => {
                window.location.reload(); //Refrsh same page
            },
        },
        {
            text: "Home",
            onClick: () => {
                navigate("/");
            },
        },
        {
            text: "Share puzzle for this word",
            onClick: () => {
                setUrlVisible(true);
            },
        }
    ];

    const loseButtons = [
        {
            text: "See solution",
            onClick: () => {
                setSolutionVisible(true)
            },
        },
    ];

    const solutionButtons = [
        {
            text: "Close",
            onClick: () => {
                setSolutionVisible(false)
            },
        }
    ];

    const urlButtons = [
        {
            text: "Close",
            onClick: () => {
                setUrlVisible(false)
            },
        }
    ];

    //UseEffect hook used to return a new solution everytime the page is refreshedolution
    useEffect(() => {
        //solution retrieved from backend
        axios.get(process.env.REACT_APP_BACKEND_URL + "word-guesser/randomSol").then(
            res => {
                setSolution((res.data.solution).toUpperCase()) 
                //url for specific word is current url + "/[solution-id]"
                setGameURL(location.href + "/" + res.data.id)
            }
        )
    }, [setSolution]) ;

    //This function resets the form with the correct message rendered above it
    //Form reset is manually to avoid resetting the page.
    const formReset = (message) => {
        setFormMessage(message)
        setCurrentGuess("")
        document.getElementById("guess-form").reset()
    }

    //This function checks the guess for any letter that are known to not be in the solution
    const hasBadLetter = () => {
        for (let c in currentGuess) {
            if (badLetters.has(currentGuess[c].toUpperCase())) {
                return true
            }
        }
        return false
    }

    //This function handles the submission of guesses from the form input area
    const submitGuess = (event) => {

        //prevent default behaviour of refreshing browser (meaning that tracked values will be lost)
        event.preventDefault()

        //use regular expressions to check for non-letter characters 
        if (nonLetterChar.test(currentGuess)) {
            formReset("Please only use letters!")
            return
        }
        //checks for incorrect word length
        if (currentGuess.length !== 5) {
            formReset("Please only input 5 letter words!")
            return
        }

        //checks if guess had already been made
        if(strGuesses.has(currentGuess.toUpperCase())) {
            formReset("You have already made the guess " + currentGuess + "!")
            return
        }

        //check for use of bad letters
        if (hasBadLetter()) {
            //message customized based of letters known to be red
            let message = "Remember! You now can't use letters " + Array.from(badLetters).join(' ,') + " because they are red!"
            formReset(message)
            return
        }


        //process guess 
        handleGuess(currentGuess.toUpperCase())

        //If guess is correct display win message box by setting isSolved to true
        if (currentGuess.toUpperCase() == solution) {
            setIsSolved(true)
            formReset("Your guess is correct!")
            return
        }

        formReset("Your guess is incorrect!")
    }

    //This function process a single guess string
    const handleGuess = (guess) => {

        //add original string to set of string guesses for future checking
        strGuesses.add(guess)

        //converts guess to a list of letter objects to be rendered
        let nextGuess = []
        for (let i = 0; i < 5; i++) {

            let nextLetter = guess[i]
            let nextStyle = ''

            if (solution.includes(nextLetter)) {
                //letter rendered green if in word at same position
                //letter rendered orange if in word in different position
                nextStyle = solution[i] == nextLetter ? 'greencell' : 'orangecell' 
            }
            else {
                //letter rendered red if not in word
                nextStyle = 'redcell' 
                badLetters.add(nextLetter) // add newly found "bad letters" to the set of bad letters
            }

            //pushed as a letter object containing letter and stylesheet class
            nextGuess.push({letter: nextLetter, style: nextStyle})
        }

        //converted guess added t guesses sate
        guesses.push(nextGuess)
    }

    //This function handles key presses in the form input area
    const changeGuess = (event) => {
        setCurrentGuess(event.target.value)
    }

    const getUserName = () => {
        return jwtDecode(localStorage.getItem("token")).username + "  ";
    }


    return <div className={styles["page-wrapper"]}>
        <BackButton redirectUrl="/other-games-page"/>
        <div className={styles["title"]}>
            Word Guesser
        </div>
        
        <div className={styles["description"]}>
            Challenge your friends with the same word sharing this url: {gameURL}
            <br></br>
            <br></br>
            You have 6 tries to guess the word. 
            <br></br>
            Type each guess into the input area below the grid and press enter or the submit button to submit the guess.
            <br></br>
            Each letter of the guess will show up on the grid in either red, orange or green depending on how close your guess was to the word.
            <br></br>
            <br></br>
            If the letter is <span id = {styles["redtile"]}>RED</span> then the letter is not in the word.
            <br></br>
            If the letter is <span id = {styles["orangetile"]}>ORANGE</span> then the letter is in the word but in the wrong spot.
            <br></br>
            If the letter is <span id = {styles["greentile"]}>GREEN</span> then the letter is in the word and in the correct spot.    
        </div>
        
        <div className={styles["grid-area"]}>
            <WordGuesserGrid guessList = {guesses}/>
        </div>
        <div className={styles["message"]}>{formMessage}</div>
        <form 
            onSubmit={submitGuess} className={styles["guess-form"]}>
                    <FormInputArea elementName="" type="text" id="guess" placeholder="type guess here"
                                   element={currentGuess} changeElement={changeGuess} />
                    <div>
                        <input type="button" value="Submit Guess"  id={styles["guess-button"]} onClick={submitGuess}/>
                    </div>
        </form>
        <MessageBox message = {"Oh no! You have ran out of tries."} buttons = {buttons.concat(loseButtons)} open = {guesses.length === 6 }/>
        <MessageBox message = {"Congratulations! The answer " + solution.toLowerCase() + " is correct!"} buttons = {buttons} open = {isSolved}/> 
        <MessageBox message = {"Challenge your friends with the same word sharing this url: " + gameURL} buttons = {urlButtons} open = {urlVisible}/> 
        <MessageBox message = {"The solution is " + solution} buttons = {solutionButtons} open = {solutionVisible}/>

        <div className={styles["comment-submission"]}>
            <CommentBox username={getUserName()} puzzType={"WordGuesser"} puzzName={"1"}/>
        </div>
        <div>
            <CommentSection puzzType={"WordGuesser"} puzzName={"1"}/>
        </div>
    </div>;
}

//Note keyboard event value of enter key: 13



