import styles from "./ButtonPanel.module.scss"
import React from "react";

/**
 * 
 * @param {*} param0 takes in the event of the button being pressed.
 * @returns the html for the buttons.
 */
export default function ButtonPanel({pressDigitButton}) {
    function loadButtons() {
        const buttons = []
        // Loop for the digit buttons.
        for (let digit = 1; digit <= 8; digit++) {
            let button = <div className={styles["digit-button"]} key={"digit-button-" + digit} onClick={() => {
                pressDigitButton(digit)
            }}>{digit}</div>;
            buttons.push(button);
        }
        return buttons;
    }

    return <div className={styles["buttons-area"]}>{loadButtons()}
    </div>;
}