import React, {useEffect, useState} from "react";
import axios from 'axios';
import styles from "./WordSearchSelectorPage.module.scss";
import {useNavigate} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";

// front-end page for the level selector. It renders a table with levels and their difficulty.
export default function WordSearchSelectorPage() {
    const [levels, setLevels] = useState([]);
    const [difficulties, setDifficulties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // get the level names and difficulties from the backend
        axios.get(process.env.REACT_APP_BACKEND_URL + "word-search-levels").then((res) => {
            setLevels(res.data.menu.levels);
            setDifficulties(res.data.menu.diffs);
        });
    }, []);

    // function that creates a custom table component
    function CustomTable() {
        function loadRows() {
            const rows = []
            const header = <thead>
            <tr>
                <td className={styles["header"]}>Level Name</td>
                <td className={styles["header"]}>          </td>
                <td className={styles["header"]}>Difficulty</td>
            </tr>
            </thead>;
            rows.push(header);
            // add each row to the table
            for (let i = 0; i < levels.length; i++) {
                const row = <tr>
                    <td className={styles["board"]}>
                        <button onClick={event => {
                            navigate('/word-search/' + levels[i])
                        }}/>
                        {levels[i]}</td>
                    <td className={styles["board"]}>{difficulties[i]}</td>
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
        <BackButton redirectUrl="/other-games"/>
            <div className={styles["page-wrapper"]}>
                <CustomTable/>
            </div>
        </div>;

}