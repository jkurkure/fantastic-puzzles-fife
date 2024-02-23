// helper function that gets the clientId from a url
export default function getClientId(url) {
    let client_id = "";
    switch (url) {
        case "https://cs3099user02.host.cs.st-andrews.ac.uk":
            client_id = "aces_g2";
            break;
        case "https://cs3099user03.host.cs.st-andrews.ac.uk":
            client_id = "cs3099group03";
            break;
        case "https://cs3099user04.host.cs.st-andrews.ac.uk":
            client_id = "cs3099-g4";
            break;
        case "https://cs3099user05.host.cs.st-andrews.ac.uk":
            client_id = "aces5";
            break;
        case "https://cs3099user06.host.cs.st-andrews.ac.uk":
            client_id = "g6";
            break;
        case "https://cs3099user07.host.cs.st-andrews.ac.uk":
            client_id = "aces-g7";
            break;
        case "https://cs3099user08.host.cs.st-andrews.ac.uk":
            client_id = "aces-eight";
            break;
        case "https://cs3099user09.host.cs.st-andrews.ac.uk":
            client_id = "aces-g9";
            break;
    }
    return client_id;
}

// const axios = require("axios");
//
// export default function getClientId(url){
//         const response = axios.post(process.env.REACT_APP_BACKEND_URL + "getClientId", {url: url});
//         alert(response.data.client_id);
//         return 'cs3099-g4';
//     }catch(error){
//         console.log(error);
//     }
//
// }