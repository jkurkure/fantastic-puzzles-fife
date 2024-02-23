// file taken from https://www.permify.co/post/jwt-authentication-in-react

import axios from 'axios';

//helper function that sets the header for axios request to include the token
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else
        delete axios.defaults.headers.common["Authorization"];
}