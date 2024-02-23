import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FormInputArea from "./FormInputArea";

describe("Test form Input For Sign in", () => {
    it("Checks that changeElement is called the correct number of times", () => {
        const changeElementMock = jest.fn();
        render(<FormInputArea elementName="Name" type="text" element={0} changeElement={changeElementMock} id="name"
                              placeholder="Placeholder test"/>);
        const input = screen.getByPlaceholderText("Placeholder test");

        userEvent.type(input, "John");
        expect(changeElementMock).toHaveBeenCalledTimes(4);

        userEvent.type(input, " ");
        expect(changeElementMock).toHaveBeenCalledTimes(5);

        userEvent.type(input, "Doe");
        expect(changeElementMock).toHaveBeenCalledTimes(8);

        userEvent.type(input, "\b");
        expect(changeElementMock).toHaveBeenCalledTimes(9);
    });

    it("Check input value is correct", () => {
        let element = "";
        const changeElementMock = jest.fn(event => element = element + event.target.value);
        render(<FormInputArea elementName="Name" type="text" element={""} changeElement={changeElementMock} id="name"
                              placeholder="Placeholder test2"/>);
        const input = screen.getByPlaceholderText("Placeholder test2");

        userEvent.type(input, "John");
        expect(changeElementMock).toHaveBeenCalledTimes(4);

        userEvent.type(input, " ");
        expect(changeElementMock).toHaveBeenCalledTimes(5);

        userEvent.type(input, "Doe");
        expect(changeElementMock).toHaveBeenCalledTimes(8);
        expect(element).toStrictEqual("John Doe");

        // remove 2 characters
        userEvent.type(input, '\b\b');
        expect(changeElementMock).toHaveBeenCalledTimes(10);
        expect(getStringAfterReplacingBackSpaces(element)).toEqual("John D");

        // add 1 extra character
        userEvent.type(input, "t")
        expect(getStringAfterReplacingBackSpaces(element)).toEqual("John Dt");

        // remove 5 characters by pressing backspace 5 times
        userEvent.type(input, '\b\b\b\b\b');
        expect(getStringAfterReplacingBackSpaces(element)).toEqual("Jo");

        // remove all characters by pressing backspace 3 more times
        userEvent.type(input, '\b\b\b');
        expect(getStringAfterReplacingBackSpaces(element)).toEqual("");
    });

    it("Check that the form props generate html with those properties", () => {
        const changeElementMock = jest.fn();
        render(<FormInputArea elementName="labelName" type="text" element={"TestElement"}
                              changeElement={changeElementMock} id="nameId"
                              placeholder="PlaceH test3"/>);

        // check that the input box has the required values from the props
        const inputBox = screen.getByDisplayValue("TestElement");
        expect(inputBox.type).toEqual("text");
        expect(inputBox.id).toEqual("nameId");
        expect(inputBox.placeholder).toEqual("PlaceH test3");

        // check that there is also a label with name elementName*
        expect(screen.getByLabelText("labelName*")).toBeInTheDocument();

    });

    it("Check that the form props generate html with those properties, email example", () => {
        let element;
        const changeElementMock = jest.fn(event => {
            element = event.target.value;
        });
        render(<FormInputArea elementName="Email" type="email" element={element}
                              changeElement={changeElementMock} id="theEmailId"
                              placeholder="scooby-doo@gmail.com"/>);

        // check that the input box has the required values from the props
        const inputBox = screen.getByDisplayValue("");
        expect(inputBox.type).toEqual("email");
        expect(inputBox.id).toEqual("theEmailId");
        expect(inputBox.placeholder).toEqual("scooby-doo@gmail.com");

        // when typing inside the inputBox changes the element value
        userEvent.type(inputBox, "email-test@yahoo.com");
        expect(inputBox.value).toEqual("email-test@yahoo.com");

        // check that there is also a label with name elementName*
        expect(screen.getByLabelText("Email*")).toBeInTheDocument();

    });
});

describe("Test backspace processing function", () => {
    it("Test pressing backspace more times than the number of letter", () => {
        const word = "Hello world!\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b";
        expect(getStringAfterReplacingBackSpaces(word)).toEqual("");
    });
    it("Test pressing backspace and writing some characters after", () => {
        const word = "Hello world!\b\b\b\b\b\b\b12345\b6";
        expect(getStringAfterReplacingBackSpaces(word)).toEqual("Hello12346");
    });
    it("Test the function on a string with no backspaces", () => {
        const word = "Hello!";
        expect(getStringAfterReplacingBackSpaces(word)).toEqual("Hello!");
    });
});

/**
 * Function that returns a string after removing all backspaces from it.
 * The code in this function is taken from
 * https://stackoverflow.com/questions/11891653/javascript-concat-string-with-backspace
 * answered Aug 9, 2012 at 21:01 by Kendall Frey
 * Last accessed Sat 6 Nov 2022
 * @param word is the string that contains some (0 or more) backspaces
 * @returns {string} the string with the backspaces removed
 */
function getStringAfterReplacingBackSpaces(word) {
    while (word.indexOf("\b") !== -1) {
        word = word.replace(/.?\x08/, "");
    }
    return word;
}