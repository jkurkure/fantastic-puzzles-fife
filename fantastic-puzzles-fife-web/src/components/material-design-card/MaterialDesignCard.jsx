import styles from "./MaterialDesignCard.module.scss";
import {useNavigate} from "react-router-dom";

/**
 * component code taken from https://codepen.io/mkurapov/pen/qNQXxz
 * the code was modified, turned into a React Component and on clicking the card, the user is redirected to a given url
 * it is free to use as it is part of the following website with free Material Designs: https://csshint.com/material-design-card-ui/
 * post 13 from the website, last accessed Nov 7th 2022
 *
 * @param cardTitle             title of card, prominent at the top of the card.
 * @param redirectUrl           URL to navigate user too.
 * @param backgroundImagePath   path to image file to be displayed on the card.
 * @param content               text underneath header.
 * @param longContent
 * @returns {JSX.Element}
 * @constructor
 */
export default function MaterialDesignCard({cardTitle, redirectUrl, backgroundImagePath, content, longContent}) {
    const navigate = useNavigate();
    return <div className={styles["tile"]} onClick={event => {
        navigate(redirectUrl);
    }}>
        <img src={`${process.env.PUBLIC_URL}/assets${backgroundImagePath}`} className={styles[".fit-image"]}
             alt="material design card image"/>
        <div className={styles["text"]}>
            <h1>{cardTitle}</h1>
            <h2 className={styles["animate-text"]}>{content}</h2>
            <p className={styles["animate-text"]}>{longContent} </p>
            <div className={styles["dots"]}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
}