import styles from "./ButtonPanel.module.scss"
import React from "react";

//
/**
 * Create 9 buttons, one for each digit, with custom style and calls a custom pressDigitButton
 * function (passed as props) on click for each button.
 * @param pressDigitButton The specific button that is being pressed.
 * @returns {JSX.Element} The specific html for this button panel.
 */
export default function ButtonPanel({pressDigitButton}) {
    function loadButtons() {
        const buttons = []
        for (let digit = 1; digit <= 9; digit++) {
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