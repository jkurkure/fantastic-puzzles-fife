import React, {useEffect, useState} from "react";
import styles from "./CommentSection.module.scss";
import axios from 'axios';

/**
 * 
 * @param {*} param0 the name of the puzzle the comment section is on and the
 * type of the puzzle.
 * @returns 
 */
export default function FormInputArea({puzzType, puzzName}) {
    const [usernames, setUsernames] = useState([]);
    const [commentIDs, setCommentIDs] = useState([]);
    const [comments, setComments] = useState([]);
    let comment ="placeholder"

    
    useEffect(() => {
        // Sends a request to the backend to get the comment data based on this particular puzzle.
        axios.get(process.env.REACT_APP_BACKEND_URL + "comment-section?puzzleType=" + puzzType + "&puzzleName=" + puzzName).then((res) => {
            setUsernames(res.data.section.commenters);
            setCommentIDs(res.data.section.ids);
            setComments(res.data.section.commentList);
        });
    }, []);


    // function that creates a custom table component.
    function CustomTable() {
        function loadRows() {
            const rows = []
            const header = <thead>       
                <tr>
                <td className={styles["header"]}>Comment ID</td>
                <td className={styles["header"]}>          </td>
                <td className={styles["header"]}>Commenter</td>
                <td className={styles["header"]}>          </td>
                <td className={styles["header"]}>Comment</td>
            </tr>
            </thead>;
            rows.push(header);
            // add each row to the table based on the data retrived.
            for (let i = 0; i < usernames.length; i++) {
                const row = <tr>
                    <td className={styles["board"]}>{commentIDs[i]}</td>
                    <td>                    </td>
                    <td className={styles["board"]}>{usernames[i]}</td>
                    <td>                    </td>
                    <td className={styles["board"]}>{comments[i]}</td>
                </tr>;
                rows.push(row);
            }
            return rows;
        }
        return <div>{loadRows()}
        </div>;
    }
    return (
        <div className={styles["page-wrapper"]}>
            <CustomTable/>
        </div>
        )
};