import styles from "./SignInPage.module.scss"
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import FormInputArea from "../../components/form-input-element/FormInputArea";
import {setAuthToken} from "../../utils/setAuthToken";
import getClientId from "../../utils/getClientId";

/**
 * This is the front end code for signing in to the website with already
 * existing user details. Will navigate aa user to the home page with correct
 * username and password details.
 * @returns {JSX.Element} The html code for the webpage.
 */
export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [superGroupLink, setSuperGroupLink] = useState("https://cs3099user02.host.cs.st-andrews.ac.uk");
    const navigate = useNavigate();

    // this page is not available if the user is signed in already, redirect to home page
    useEffect(() => {
        if (localStorage.getItem("token"))
            navigate("/");
    }, []);

    /**
     * Changes the username field on input.
     * @param event Keyboard input.
     */
    const changeUsername = (event) => {
        setUsername(event.target.value);
    }


    /**
     * Changes the password name field on input.
     * @param event Keyboard input.
     */
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    /**
     * Checks if a user of these details are in the database. If so, redirected to the home page.
     * Otherwise, and error message displays.
     */
    const submitForm = async function (event) {
        event.preventDefault();
        try {
            const canLogin = await axios.post(process.env.REACT_APP_BACKEND_URL + "sign-in", {
                username: username,
                password: password
            });

            // for a successful sign in, set the jwt token in local storage and redirect to home page
            if (canLogin.data.message === "SUCCESSFUL SIGN IN") {

                localStorage.setItem("token", canLogin.data.token);

                //set token to axios common header
                setAuthToken(canLogin.data.token);
                navigate("/");
            } else {
                alert(canLogin.data.message);
            }

        } catch (e) {
            console.log(e);
        }
        setPassword("");

    }

    return (
        <div className={styles["sign-up-container"]}>
            <div className={styles["side-image"]}>
                <div className={styles["logo"]}>
                    <h2 className={styles["logo-text-background"]}> Fantastic Puzzles Fife</h2>
                </div>
            </div>
            <div className={"card-body " + styles["form-area"]}>
                <div className={styles["already-signed-up"]}>
                    <p> Registered on another website?
                        <select name="superGroupSelector" id="superGroupSelector" form="supergroupSelector"
                                onChange={event => {
                                    setSuperGroupLink(event.target.value);
                                }}>
                            <option value="https://cs3099user02.host.cs.st-andrews.ac.uk">Group 2</option>
                            <option value="https://cs3099user03.host.cs.st-andrews.ac.uk">Group 3</option>
                            <option value="https://cs3099user04.host.cs.st-andrews.ac.uk">Group 4</option>
                            <option value="https://cs3099user05.host.cs.st-andrews.ac.uk">Group 5</option>
                            <option value="https://cs3099user06.host.cs.st-andrews.ac.uk">Group 6</option>
                            <option value="https://cs3099user07.host.cs.st-andrews.ac.uk">Group 7</option>
                            <option value="https://cs3099user08.host.cs.st-andrews.ac.uk">Group 8</option>
                            <option value="https://cs3099user09.host.cs.st-andrews.ac.uk">Group 9</option>
                        </select>
                        <a href={superGroupLink + "/oauth/authorize?client_id=cs3099-g1&redirect_url=https%3A%2F%2Fcs3099user01.host.cs.st-andrews.ac.uk%2Foauth%2Fredirect%2F" + getClientId(superGroupLink)}>
                            <button type="button" id={styles["supergroup-button"]} className="btn btn-secondary btn-lg"
                            >Federation Log In
                            </button>
                        </a>
                    </p>

                </div>
                <form className={styles["sign-up-form"]} onSubmit={submitForm}>
                    <FormInputArea elementName="Username" type="text" id="username" placeholder="user1234"
                                   element={username} changeElement={changeUsername}/>
                    <FormInputArea elementName="Password" type="password" id="password" placeholder="Password"
                                   element={password} changeElement={changePassword}/>
                    <div>
                        <input type="submit" value="Sign In" className="btn btn-primary" id={styles["sign-up-button"]}/>
                    </div>
                </form>
                <div className={styles["already-signed-up"]}>
                    <p>{"Don't have an account?  "}
                        <a href="/sign-up" id={styles["log-in-text"]}>Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}