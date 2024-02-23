import React from "react";
import styles from "./CommentInputBox.module.scss";
import axios from 'axios';

/**
 * 
 * @param {*} param0 the username that made the comment, the type of the
 * puzzle that was commented on and the name of the puzzle.
 * @returns the html for the comment input box.
 */
export default function FormInputArea({username, puzzType, puzzName}) {
    let comment ="placeholder"
    

    /**
     * Sends the comment to the back end.
     */
    const sendComment = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "add-comment", {
            puzzleType: puzzType,
            // Names with a space will have it saved as %20, this must be
            // replaced with a space.
            puzzleName: puzzName.replace(/%20/g, " "),
            commenter: username,
            comment: document.getElementById("comment").value
        })
        .then((res) => {
            // Reloads the window if the comment was saved successfully.
            if (res.data === "COMMENT ADDED") {
                window.location.reload();
            }
        })
        
    }
    return (
        <div className={styles["form-control"]}>
            <div className={styles["label-description"]}>
                Submit a comment
            </div>
            <input type="text" className={styles["comment-box"]} id="comment" 
                   placeholder="Comment here" required/>
                   <div></div>
            <button type="button" id={styles["send-button"]} className="btn btn-secondary btn-lg" onClick={(event) => sendComment()}>
            Send Comment
            </button>
        </div>
        
        )
};