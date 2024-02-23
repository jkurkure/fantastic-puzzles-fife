import React from "react";
import styles from "./LogOutButton.module.scss";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";

//
/**
 * Component that displays a logout button that removes the jwt token from local storage. It also displays a username
 * next to the logout icon.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LogOutButton() {
    const navigate = useNavigate();

    return <div className={styles["wrapper"]}>
        <div> {jwtDecode(localStorage.getItem("token")).username + "  "} </div>
        <button type="button" id={styles["check-button"]} className="btn btn-secondary btn-lg" onClick={event => {
            localStorage.removeItem("token");
            navigate("/sign-in")
        }}>Log Out
        </button>
    </div>;
}