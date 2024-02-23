import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import styles from "./MessageBox.module.scss";
import {useNavigate} from "react-router-dom";

//NOTE: This component is edited from the WinMessageBox to be a generic end game message box with an inputable message

// Used this Material UI Dialog demo as starter code (it is from the official Material UI github):
// https://github.com/mui/material-ui/blob/v5.10.12/docs/data/material/components/dialogs/CustomizedDialogs.js
// Last Accessed 2022 Nov 11th 11:47AM
// The code from the link above was used as inspiration and for the backbone of the customized component below.
// all the onclick handlers, the text font and the color, background-color were added
// Includes functionality for replaying a level and returning to the home page

/**
 * The specific styling for this Message Box.
 * @type {StyledComponent<PropsOf<(props: DialogProps) => JSX.Element> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiPaper-root': {
        padding: theme.spacing(2),
        backgroundColor: "#fff1c5",
        border: "2px solid black",
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: "#fff1c5",
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        backgroundColor: "#fff1c5",
    },
}));

/**
 * A dynamic Message box that can be used for a variety of purposes throughout the project.
 * Mainly used to notify the user of the outcome of website operations as a replacement of
 * browser alerts.
 * @param message The message of the pop-up box.
 * @param buttons A series of input-table buttons with differing functionalities onClick.
 * @param open Decides if the pop-up is displayed or not.
 * @returns {JSX.Element} The html to be returned for a dynamic Message Box.
 */
export default function MessageBox({message, buttons, open}) {

    /**
     * The html to be returned for a specific Message Box.
     */
    return (
        <div>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent
                    className={styles["message-text"] + " " + styles["text"]}
                >
                    {message}
                </DialogContent>
                <DialogActions>
                    {buttons.map((button, index) => (
                        <Button key={index} onClick={button.onClick}>
                            <div className={styles["text"]}>{button.text}</div>
                        </Button>
                    ))}
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
