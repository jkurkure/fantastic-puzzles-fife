import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import styles from "./WinMessageBox.module.scss";
import {useNavigate} from "react-router-dom";


//OLD VERSION OF WIN MESSAGE BOX
//KEPT IN CODE TO AVOID COMPLICATIONS IF OTHER BRANCHES HAVE USED IT

// Used this Material UI Dialog demo as starter code (it is from the official Material UI github):
// https://github.com/mui/material-ui/blob/v5.10.12/docs/data/material/components/dialogs/CustomizedDialogs.js
// Last Accessed Nov 11th 11:47AM
// The code from the link above was used as inspiration and for the backbone of the customized component below.
// all the onclick handlers, the text font and the color, background-color were added
// Includes functionality for replaying a level and returning to the home page

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
 * A Win Message box used for notifying the user of when they have solved a puzzle.
 * @returns {JSX.Element} The html to be returned for a dynamic Message Box.
 */
export default function MessageBox() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * The html to be returned for a specific Message Box.
     */
    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogContent className={styles["message-text"] + " " + styles["text"]}>
                    "Congratulations, you have correctly solved the puzzle!"
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        handleClose();
                        window.location.reload();

                    }}>
                        <div className={styles["text"]}>
                            Play again
                        </div>
                    </Button>
                    <Button onClick={() => {
                        handleClose();
                        navigate("/");
                    }}>
                        <div className={styles["text"]}>
                            Go to level selector
                        </div>
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
