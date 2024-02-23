
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate, useSearchParams} from "react-router-dom";

//This is page randomly generates a solution and redirects the user to the word guesser page that uses this solution
export default function RefreshWordGuesser() {
    const navigate = useNavigate();

    //UseEffect hook used to return a new solution everytime the page is refreshedolution
    useEffect(() => {
        //solution retrieved from backend
        axios.get(process.env.REACT_APP_BACKEND_URL + "word-guesser/generateID").then(
            res => {
                //navigate to url for word
                navigate("/word-guesser/" + res.data.id)
            }
        ).catch(error => console.log(error)) //catch any errors caused by retrieving the word
    }, []);

    return (
        <p>
            Oh no! There has been an error loading this puzzle. Please refresh the page to try again.
        </p>
    );
}