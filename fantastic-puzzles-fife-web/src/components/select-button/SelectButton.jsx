import React from "react";
import styles from "./SelectButton.module.scss";
import {useNavigate} from "react-router-dom";

/**
 * Button to select a level / puzzle
 * @param redirectUrl   Url user is navigated to by button click
 * @param name          Name button displays
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectButton({redirectUrl, name}) {

    //uses navigate hook to navigate to URL passed in
    const navigate = useNavigate();

    return <div className={styles["wrapper"]}>
        <button type="hello" id={styles["check-button"]} className="btn btn-secondary btn-lg" onClick={event => {
            navigate(redirectUrl)
        }}>{name}
        </button>
    </div>;
}