import styles from "./WordGuesserGrid.module.scss";
import React from "react";

// This component is generates a the grid for the word guesser game.
// With all the previous guesses made in the correct colours
export default function WordGuesserGrid({guessList}) {

    // this function returns a list of all cell jsx componets in the wordle grid 
    const loadFields = () => {

        //array of jsx component cells
        const cells = []
        
    
        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 5; column++) {

                //default value and css style class for unfilled cells 
                let value = " "
                let colourID = styles["redcell"]

                //assigns value and css style class to cells with letters
                if (row < guessList.length) {

                    value = guessList[row][column].letter
                    colourID = styles[guessList[row][column].style]
                }

                //create cell jsx component and push to array
                let cellComponent = <div
                    className={colourID}
                >{value}</div>;

                cells.push(cellComponent)
            }
        }
        return cells
    }

    //use "board" stylesheet class to render array of cells into a 5 by 6 grid
    //add message below bo
    return <div id={styles["board"]}>{loadFields()}</div>
    
}

