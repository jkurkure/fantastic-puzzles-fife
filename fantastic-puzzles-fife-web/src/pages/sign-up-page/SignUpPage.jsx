import styles from "./SignUpPage.module.scss"
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import FormInputArea from "../../components/form-input-element/FormInputArea";

/**
 * This is the front end code for signing up for the website.
 * Will navigate aa user to the sign in page when an account
 * is correctly created.
 * @returns {JSX.Element} The html code for the webpage.
 */
function SignUpPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    /**
     * Changes the first name field on input.
     * @param event Keyboard input.
     */
    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    /**
     * Changes the last name field on input.
     * @param event Keyboard input.
     */
    const changeLastName = (event) => {
        setLastName(event.target.value);
    }

    /**
     * Changes the email field on input.
     * @param event Keyboard input.
     */
    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    /**
     * Changes the password field on input.
     * @param event Keyboard input.
     */
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    /**
     * Changes the confirm password field on input.
     * @param event Keyboard input.
     */
    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    /**
     * Changes the username field on input.
     * @param event Keyboard input.
     */
    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    /**
     * Submits the details of the user to be checked it matches the correct
     * formatting for an account. If it does, it is sent to the database.
     * Otherwise, the user is notified of this issue.
     */
    const submitForm = async function (event) {
        event.preventDefault();
        // check that the passwords match
        if (password !== confirmPassword) {
            alert("Passwords didn't match. Please confirm password.");
            return;
        }
        try {
            // send a registration request to the backend
            const canSignUp = await axios.post(process.env.REACT_APP_BACKEND_URL + "sign-up", {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
            });

            // if successful redirect to sign in page
            if (canSignUp.data.message === "SUCCESSFUL REGISTRATION") {
                navigate("/sign-in");
            } else {
                alert(canSignUp.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        setPassword("");
        setConfirmPassword("");
    }

    // this page is not available if the user is signed in already, redirect to home page
    useEffect(() => {
        if (localStorage.getItem("token"))
            navigate("/");
    }, []);

    return (
        <div className={styles["sign-up-container"]}>
            <div className={styles["side-image"]}>
                <div className={styles["logo"]}>
                    <h2 className={styles["logo-text-background"]}> Fantastic Puzzles Fife</h2>
                </div>
            </div>
            <div className={"card-body " + styles["form-area"]}>
                <form className={styles["sign-up-form"]} onSubmit={submitForm}>
                    <FormInputArea elementName="First Name" type="text" id="first-name" placeholder="John"
                                   element={firstName} pattern="[A-Za-z-( )]+$"
                                   title="Please enter only letters, hyphens or spaces."
                                   changeElement={changeFirstName}/>
                    <FormInputArea elementName="Last Name" type="text" id="last-name" placeholder="Doe"
                                   element={lastName} pattern="[A-Za-z-( )]+$"
                                   title="Please enter only letters, hyphens or spaces."
                                   changeElement={changeLastName}/>
                    <FormInputArea elementName="Username" type="text" id="username" placeholder="user1234"
                                   element={username} changeElement={changeUsername}/>
                    <FormInputArea elementName="Email address" type="email" id="email" placeholder="johndoe@gmail.com"
                                   element={email} changeElement={changeEmail}/>
                    <FormInputArea elementName="Password" type="password" id="password" placeholder="Password"
                                   element={password} changeElement={changePassword}/>
                    <FormInputArea elementName="Confirm Password" type="password" id="confirmed-password"
                                   placeholder="Password" element={confirmPassword}
                                   changeElement={changeConfirmPassword}/>
                    <div>
                        <input type="submit" value="Create Account" className="btn btn-primary"
                               id={styles["sign-up-button"]}/>
                    </div>
                </form>
                <div className={styles["already-signed-up"]}>
                    <p>{"Already have an account?  "}
                        <a href="/sign-in" id={styles["log-in-text"]}>Log in</a></p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;