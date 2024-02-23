import styles from "./CreateWordSearch.module.scss";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import React, { useState } from "react";

// front-end page for the sudoku creator
export default function CreateWordSearch() {
    const navigate = useNavigate();
    const generateWordsearch = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "wordsearch/make-puzzle", {}).then(
            res => {
                document.getElementById("seed").innerHTML = "Seed: " + res.data.seed;
                document.getElementById("puzzle").innerHTML = res.data.puzzle;
            }
        )
    }

    const tryPuzzle = () => {
        navigate("/wordsearch?seed=" + (document.getElementById("seed").innerHTML.split(" ")[1] + "" + document.getElementById("seed").innerHTML.split(" ")[2] + document.getElementById("seed").innerHTML.split(" ")[3]).replaceAll("#", ""));
    }

    window.onload = generateWordsearch();

    return <div className={styles["page-wrapper"]}>
        <BackButton redirectUrl="/other-games-page"/>
        <p className={styles["title"]}>
            Word Search
        </p>
        <div className={styles["box"]} tabIndex="0">
            <p className={styles["subtitle"]} id="seed">
                seed: #fde6a2
            </p>
            <p className={styles["title"]} id="puzzle">
                KTVAIL
            </p>
        </div>
        <div className={styles["grid-area"]}>
        <button type="button" id={styles["check-button"]} onClick={event => generateWordsearch()}>Generate Another</button>
        <button type="button" id={styles["check-button"]} onClick={event => tryPuzzle()}>Play This</button>
        </div>
    </div>
}

//        <button type="button" id={styles["check-button"]} onClick={event => save()}>Save for Later</button>