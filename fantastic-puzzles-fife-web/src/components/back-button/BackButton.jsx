import React from "react";
import styles from "./BackButton.module.scss";
import {useNavigate} from "react-router-dom";

/**
 * Button component to be added to a page to navigate user to a page closer to the homepage.
 * @param redirectUrl   URL user is navigated too.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BackButton({redirectUrl}) {

    //uses navigate hook to navigate to URL passed in
    const navigate = useNavigate();

    return <div className={styles["wrapper"]}>
        <button type="button" id={styles["button"]} className="btn btn-secondary btn-lg" onClick={event => {
            navigate(redirectUrl)
        }}>Back
        </button>
    </div>;
}