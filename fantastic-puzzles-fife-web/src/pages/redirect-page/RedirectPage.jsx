import styles from "./RedirectPage.module.scss"
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, useSearchParams} from "react-router-dom";

// front-end-page for when a user is redirected back to our website in supergroup interaction.
export default function RedirectPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // get the code and client_id from the provided url
    const code = searchParams.get("code");
    let url = window.location.href;
    const client_id = url.replace("https://cs3099user01.host.cs.st-andrews.ac.uk/oauth/redirect/", "").split('?')[0];
    const postUrl = window.location.href.replace("https://cs3099user01.host.cs.st-andrews.ac.uk/", "https://cs3099user01.host.cs.st-andrews.ac.uk/rest/");

    useEffect(() => {
        // post the information retrieved from the url to the back-end. If the backend sends a response, we login the user and redirect to the home page.
        axios.post(postUrl, {code: code, client_id: client_id}).then(res => {
            localStorage.setItem("token", res.data.token);
            navigate("/");
        }).catch(error => console.log(error));
    }, []);


    return (
        <p>
            Wait for secure authentication.
        </p>
    );
}