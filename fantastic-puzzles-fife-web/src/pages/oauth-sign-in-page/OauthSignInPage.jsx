import styles from "./OauthSignInPage.module.scss"
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, useSearchParams} from "react-router-dom";
import FormInputArea from "../../components/form-input-element/FormInputArea";

// front-end for the oauth sign in page. This is shown when someone tries to login on a foreign website using our website's credentials.
export default function OauthSignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // this page is not available if the user is signed in already, redirect to home page
    useEffect(() => {
        if (localStorage.getItem("token"))
            navigate("/");
    }, []);


    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const submitForm = async function (event) {
        event.preventDefault();
        try {

            // perform a normal sign in
            const canLogin = await axios.post(process.env.REACT_APP_BACKEND_URL + "sign-in", {
                username: username,
                password: password
            });

            if (canLogin.data.message === "SUCCESSFUL SIGN IN") {

                const client_id = searchParams.get("client_id");
                const redirect_url = searchParams.get("redirect_url");

                // encode the username and client_id as an object in the backend
                const encodedInfo = await axios.post(process.env.REACT_APP_BACKEND_URL + "generate-code/encrypt", {
                    username: username,
                    client_id: client_id
                });
                // redirect the user to the redirect_url specified in the header and append the code to it
                window.location.replace(redirect_url + "?code=" + encodeURIComponent(encodedInfo.data.code));
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
                <form className={styles["sign-up-form"]} onSubmit={submitForm}>
                    <FormInputArea elementName="Username" type="text" id="username" placeholder="user1234"
                                   element={username} changeElement={changeUsername}/>
                    <FormInputArea elementName="Password" type="password" id="password" placeholder="Password"
                                   element={password} changeElement={changePassword}/>
                    <div>
                        <input type="submit" value="Sign In" className="btn btn-primary" id={styles["sign-up-button"]}/>
                    </div>
                </form>
            </div>
        </div>
    );
}