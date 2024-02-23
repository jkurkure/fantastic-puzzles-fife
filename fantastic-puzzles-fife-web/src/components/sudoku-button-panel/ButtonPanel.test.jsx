import {render, screen} from "@testing-library/react";
import ButtonPanel from "./ButtonPanel";
import userEvent from "@testing-library/user-event"
import styles from "./ButtonPanel.module.scss";

describe("Test form Input For Sign in", () => {
    it("Checks that pressDigitButton is called the correct number of times", () => {
        const clickDigitButton = jest.fn();
        render(<ButtonPanel pressDigitButton={clickDigitButton}/>);
        const button1 = screen.getByText("1");
        const button2 = screen.getByText("2");
        const button3 = screen.getByText("3");

        userEvent.click(button1);
        expect(clickDigitButton).toHaveBeenCalledTimes(1);

        userEvent.click(button2);
        expect(clickDigitButton).toHaveBeenCalledTimes(2);

        userEvent.click(button2);
        expect(clickDigitButton).toHaveBeenCalledTimes(3);

        userEvent.click(button3);
        expect(clickDigitButton).toHaveBeenCalledTimes(4);

        userEvent.click(button1);
        expect(clickDigitButton).toHaveBeenCalledTimes(5);
    });

    it("Checks that all 9 buttons appear on the page (and they have the text equals to a digit)", () => {
        const clickDigitButton = jest.fn();
        const {container} = render(<ButtonPanel pressDigitButton={clickDigitButton}/>);

        // check that each button appears
        for (let digit = 1; digit <= 9; ++digit)
            expect(screen.getByText(digit)).toBeInTheDocument();

        // check that there are no other buttons
        expect(screen.queryByText(0)).not.toBeInTheDocument();
        expect(screen.queryByText(10)).not.toBeInTheDocument();

        // count that there are exactly 9 digit buttons
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        expect(container.getElementsByClassName(styles["digit-button"]).length).toEqual(9);

        // test that this is all wrapped in a div with the specified class
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        expect(container.getElementsByClassName(styles["buttons-area"]).length).toEqual(1);
    });
});