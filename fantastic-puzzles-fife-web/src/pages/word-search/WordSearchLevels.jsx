import React, {useEffect, useState} from "react";
import axios from 'axios';
import styles from "./WordSearchLevels.module.scss";
import {useNavigate} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import SelectButton from "../../components/select-button/SelectButton";

// front-end page for the level selector. It renders a table with levels and their difficulty.
export default function WordSearchLevels() {
    const [seeds, setSeeds] = useState([]);
    const [users, setUsers] = useState([]);
    const [scores, setScores] = useState([]);
    const [dates, setDates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // get the level names and difficulties from the backend
        axios.get(process.env.REACT_APP_BACKEND_URL + "wordsearch/levels").then((res) => {
            let Table = res.data;
            //console.log(Table.map(({ seed }) => seed));
            setSeeds(Table.map(({ seed }) => seed));
            setUsers(Table.map(({ user }) => user));
            setScores(Table.map(({ score }) => score));
            setDates(Table.map(({ date }) => date.substring(0, 10)));
        });
    }, []);

    // function that creates a custom table component
    function CustomTable() {
        function loadRows() {
            const rows = []
            const header = <thead>
            <tr>
                <td className={styles["header"]}>Seed</td>
                <td className={styles["header"]}>User</td>
                <td className={styles["header"]}>Score</td>
                <td className={styles["header"]}>Date</td>
            </tr>
            </thead>;
            rows.push(header);
            // add each row to the table
            for (let i = 0; i < seeds.length; i++) {
                const row = <tr>
                    <SelectButton redirectUrl={'/wordsearch?seed=' + seeds[i].replaceAll(',', '')} name={seeds[i]}/>
                    <td className={styles["board"]}>{users[i]}</td>
                    <td className={styles["board"]}>{scores[i]}</td>
                    <td className={styles["board"]}>{dates[i]}</td>
                </tr>;
                rows.push(row);
            }
            return rows;
        }

        return <div>{loadRows()}
        </div>;
    }
//homepage redirectUrl is "/"
    return <div>
        <BackButton redirectUrl="/other-games-page"/>
            <div className={styles["page-wrapper"]}>
                <CustomTable/>
            </div>
        </div>;

}