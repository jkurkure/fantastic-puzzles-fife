import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WordGuesserGrid from "./WordGuesserGrid.jsx";

describe("EmptyWordGuesserGrid", () =>  {

    const guessList = []


    it("renders a 5 by 6 empty grid with correct style", () => {
        const { container } = render(<WordGuesserGrid guessList = {guessList}/>);
        const cells = container.querySelectorAll(".redcell");
        expect(cells).toHaveLength(5*6);
    });
    it("all values in empty grid are empty", () => {
        const { container } = render(<WordGuesserGrid guessList ={guessList}/>);
        const cells = container.querySelectorAll(".redcell");
        cells.forEach(cell => expect(cell.textContent).toEqual(" "));
    });

})


describe("OnlyRedWordGuesserGrid", () =>  {

    const onlyRed = [[{letter: 'H', style: 'redcell'}, {letter: 'A', style: 'redcell'}, {letter: 'N', style: 'redcell'}, {letter: 'D', style: 'redcell'}, {letter: 'Y', style: 'redcell'}]]
    const allLetters = ["H", "A", "N", "D", "Y"].concat(Array.from({length: 5*5}, () => " "))


    it("renders a 5 by 6 empty grid with correct style", () => {
        const { container } = render(<WordGuesserGrid guessList = {onlyRed}/>);
        const cells = container.querySelectorAll(".redcell");
        expect(cells).toHaveLength(5*6);
    });
    it("letters values are assigned correctly", () => {
        const { container } = render(<WordGuesserGrid guessList ={onlyRed}/>);
        const cells = container.querySelectorAll(".redcell");

        for (let i = 0; i < cells.length; i++){
            expect(cells[i].textContent).toEqual(allLetters[i])
        }
    });

})

describe("DifferentColoursWordGuesserGrid", () =>  {

    const gridRed = "rgba(250, 146, 146, 0.938)";
    const gridOrange = "rgb(255, 198, 93)";
    const gridGreen = "rgb(86, 163, 86)"

    const guessList = [[{letter: 'H', style: 'redcell'}, {letter: 'A', style: 'greencell'}, {letter: 'N', style: 'redcell'}, {letter: 'D', style: 'orangecell'}, {letter: 'Y', style: 'redcell'}]]
    const allStyles = [gridRed, gridGreen, gridRed, gridOrange, gridRed].concat(Array.from({length: 5*5}, () => gridRed))
    const allLetters = ["H", "A", "N", "D", "Y"].concat(Array.from({length: 5*5}, () => " "))


    it("renders a 5 by 6 empty grid", () => {
        const { container } = render(<WordGuesserGrid guessList = {guessList}/>);
        const cells = container.querySelectorAll(".redcell , .orangecell , .greencell");
        expect(cells).toHaveLength(5*6);
    });
    it("each cell has correct letter value", () => {
        const { container } = render(<WordGuesserGrid guessList ={guessList}/>);
        const cells = container.querySelectorAll(".redcell , .orangecell , .greencell");

        for (let i = 0; i < cells.length; i++){
            expect(cells[i].textContent).toEqual(allLetters[i])
        }
    });
    it("each cell has correct colour", () => {
        const { container } = render(<WordGuesserGrid guessList ={guessList}/>);
        const cells = container.querySelectorAll(".redcell , .orangecell , .greencell");

        for (let i = 0; i < cells.length; i++){
            expect(cells[i]).toHaveStyle('color: ${allStyles[i]}');
        }
    });


})

describe("FullWordGuesserGrid", () =>  {

    const gridRed = "rgba(250, 146, 146, 0.938)";
    const gridOrange = "rgb(255, 198, 93)";
    const gridGreen = "rgb(86, 163, 86)"

    const guessList = [[{letter: 'A', style: 'redcell'}, {letter: 'B', style: 'greencell'}, {letter: 'C', style: 'redcell'}, {letter: 'D', style: 'orangecell'}, {letter: 'E', style: 'redcell'}],
                        [{letter: 'X', style: 'redcell'}, {letter: 'F', style: 'greencell'}, {letter: 'G', style: 'redcell'}, {letter: 'H', style: 'orangecell'}, {letter: 'I', style: 'redcell'}],
                        [{letter: 'J', style: 'redcell'}, {letter: 'K', style: 'greencell'}, {letter: 'L', style: 'redcell'}, {letter: 'M', style: 'orangecell'}, {letter: 'N', style: 'redcell'}],
                        [{letter: 'O', style: 'redcell'}, {letter: 'P', style: 'greencell'}, {letter: 'Q', style: 'redcell'}, {letter: 'R', style: 'orangecell'}, {letter: 'S', style: 'redcell'}],
                        [{letter: 'T', style: 'redcell'}, {letter: 'U', style: 'greencell'}, {letter: 'V', style: 'redcell'}, {letter: 'W', style: 'orangecell'}, {letter: 'Y', style: 'redcell'}],
                        [{letter: 'Z', style: 'redcell'}, {letter: 'Z', style: 'greencell'}, {letter: 'Z', style: 'redcell'}, {letter: 'Z', style: 'orangecell'}, {letter: 'Z', style: 'redcell'}]]

    const allStyles = [gridRed, gridGreen, gridRed, gridOrange, gridRed, gridRed, gridGreen, gridRed, gridOrange, gridRed, gridRed, gridGreen, 
        gridRed, gridOrange, gridRed, gridRed, gridGreen, gridRed, gridOrange, gridRed, gridRed, gridGreen, gridRed, gridOrange, gridRed,
         gridRed, gridGreen, gridRed, gridOrange, gridRed]

    const allLetters = ["A", "B", "C", "D", "E", "X","F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 
            "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z", "Z", "Z", "Z", "Z"]


    it("renders a 5 by 6 empty grid", () => {
        const { container } = render(<WordGuesserGrid guessList = {guessList}/>);
        const cells = container.querySelectorAll(".redcell , .orangecell , .greencell");
        expect(cells).toHaveLength(5*6);
    });
    it("each cell has correct letter value", () => {
        const { container } = render(<WordGuesserGrid guessList ={guessList}/>);
        const cells = container.querySelectorAll(".redcell , .orangecell , .greencell");

        for (let i = 0; i < cells.length; i++){
            expect(cells[i].textContent).toEqual(allLetters[i])
        }
    });
    it("each cell has correct colour", () => {
        const { container } = render(<WordGuesserGrid guessList ={guessList}/>);
        const cells = container.querySelectorAll(".redcell , .orangecell , .greencell");

        for (let i = 0; i < cells.length; i++){
            expect(cells[i]).toHaveStyle('color: ${allStyles[i]}');
        }
    });


})