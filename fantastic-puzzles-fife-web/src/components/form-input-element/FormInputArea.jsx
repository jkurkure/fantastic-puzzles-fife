import React from "react";
import styles from "./FormInputArea.module.scss";

// component that renders a label and a box to insert text. It has a particular styling defined.
// Used in order to reduce code duplication. The props are optional and can include input pattern (A-Z and 0-9 only for example).
/**
 *
 * @param elementName
 * @param type
 * @param element
 * @param changeElement
 * @param id
 * @param placeholder
 * @param pattern
 * @param title
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormInputArea({elementName, type, element, changeElement, id, placeholder, pattern, title}) {
    return (
        <div>
            <div className={styles["label-description"]}>
                <label htmlFor={id}>{elementName}*</label>
            </div>
            <input type={type} className={styles["form-control"]} id={id} value={element} pattern={pattern}
                   title={title} onChange={changeElement}
                   placeholder={placeholder} required/>
        </div>
        )
};