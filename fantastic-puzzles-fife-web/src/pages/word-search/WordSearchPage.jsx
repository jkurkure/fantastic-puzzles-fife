import styles from "./CreateWordSearch.module.scss";
import axios from 'axios';
import WordCloud from "wordcloud";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import React, {useState} from "react";
import BackButton from "../../components/back-button/BackButton";
import MessageBox from "../../components/message-box/MessageBox";
import WinMessageBox from "../../components/win-message-box/WinMessageBox";
import CommentBox from "../../components/comment-input/CommentInputBox";
import CommentSection from "../../components/comment-section/CommentSection";
// front-end page for the word search 

export default function WordSearchPage() {
    const navigate = useNavigate();
    let readyToGo = "false";
    const theUsername = jwtDecode(localStorage.getItem("token")).username;
    console.log(theUsername);
    let currentSeed = ["LOA", "DING", "..."];
    const [finishAppearance, setFinishAppearance] = useState(false);
    const [isSolved, setIsSolved] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [open, setOpen] = React.useState(true);

    const buttons = [
        {
            text: "Continue",
            onClick: () => {
                setOpen(false);
                setButtonClicked(false);
            },
        },
        {
            text: "Go back to home",
            onClick: () => {
                setOpen(false);
                navigate("/");
            },
        },
    ];


    const calculateJumble = (seedValue) => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "wordsearch/cook?seed=" + seedValue, {}).then(
            res => {
                const words = res.data.puzzle.split("")
                //create a 2D array of the items in word with a corresponding random number between 15 and 30
                const wordList = words.map(word => [word, Math.floor(Math.random() * 15) + 17])
                console.log(wordList)

                // create the word cloud using WordCloud.js
                WordCloud(document.getElementById("puzzle"), {
                    list: wordList,
                    backgroundColor: "#fff1c0",
                    minSize : 12,
                    shape: "diamond"
                });
            }
        )
    }

    const setPuzzle = () => {
        var url_string = window.location.href; 
        var url = new URL(url_string);
        currentSeed = url.searchParams.get("seed").match(/.{1,6}/g);
        calculateJumble(currentSeed);
    }

    const submitAnswers = () => {
        setButtonClicked(true);
        setOpen(true);
        axios.get(process.env.REACT_APP_BACKEND_URL + "wordsearch/check?seed=" + currentSeed + "&guess=" + document.getElementById("guess").value.replaceAll("\n", ":"), {}).then(
            res => {
                console.log(res.data)
                if (res.data.result) {
                    document.getElementById("score").innerHTML = "Score: " + res.data.points;
                    document.getElementById("breakdown").innerHTML = "Score Breakdown: ";
                    for (let i = 0; i < res.data.board.length; i++) {
                        document.getElementById("breakdown").innerHTML += "<br/>" + res.data.board[i][0] + ": " + res.data.board[i][1];
                    }
                    setFinishAppearance(true);
                    setIsSolved(true);
                } else {
                    setIsSolved(false);
                }
            }
        )
    }

    const setReadyToGo = () => {
        readyToGo = "true";
    }

    const highScore = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "wordsearch/highscore?seed=" + currentSeed + "&score=" + document.getElementById("score").innerHTML.split(" ")[1] + "&username=" + theUsername, {}).then(
            res => {
                console.log(res.data)
                if (res.data.valid) {
                    setReadyToGo();
                }
                else {
                    alert("You can't enter the leaderboard with that score!");
                }
            }
        );
        console.log(readyToGo);
    }
    const goToLeaderBoard = () => {
        console.log(readyToGo); 
        if (readyToGo){
            navigate("/wordsearch-levels");
        }
    }

    const finish = () => {
        highScore();
        goToLeaderBoard();
    }

    const getUserName = () => {
        return jwtDecode(localStorage.getItem("token")).username + "  ";
    }

    const getPuzzleName = () => {
        return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    }

    window.onload = setPuzzle();

    return <div class={styles["page-wrapper"]} tabIndex="0">
        <BackButton redirectUrl="/wordsearch-levels"/>
        <p className={styles["title"]}>
            Word Search
        </p>
        <div className={styles["box"]} tabIndex="0">
            <p className={styles["subtitle"]} id="seed">
                seed: {"#" + currentSeed[0] + " #" + currentSeed[1] + " #" + currentSeed[2]}
            </p>
            <div style={{ display: "flex" }} >
                <div style={{ flex: 1, border: "1px solid black" }}>
                    <canvas id="puzzle" style={{minWidth: "461px"}}></canvas>
                </div>
                <div style={{ flex: 1, border: "1px solid black" }}>
                    <p className={styles["subtitle"]} id="breakdown">
                        Score Breakdown:
                    </p>
                </div>
            </div>
            <p className={styles["score"]} id="score">
            </p>
            <div className={styles["grid-area"]}>
            <p>
                Enter your answers below, separated by a new-line.
                <br />You get 1 point for each word you find.
                <br /> And 4 extra points if it is one of the original words that made the puzzle.
            </p>
            </div>
        </div>
        
        <div className={styles["box"]} tabIndex="0">
        <form>
        <textarea type="text" className={styles["form-control"]} id="guess" placeholder="Enter a guess" required></textarea>
        </form>
        <div className={styles["grid-area"]}>
            <button type="button" id={styles["check-button"]} onClick={event => submitAnswers()}>Submit</button>
            {buttonClicked && (isSolved ? " " :
                <MessageBox message="Invalid word."
                            buttons={buttons}
                            open={open}
                            setOpen={setOpen} />)}
            {finishAppearance ?  <button type="button" id={styles["finish-button"]} onClick={event => {finish();}}>Finish</button> : ""}
        </div>
        </div>
        <div className={styles["comment-submission"]}>
            <CommentBox username={getUserName()} puzzType={"Sudoku"} puzzName={getPuzzleName()}/>
        </div>
        <div>
            <CommentSection puzzType={"Sudoku"} puzzName={getPuzzleName()}/>
        </div>
    </div>;
}