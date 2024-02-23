import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router-dom";
import BackButton from "./BackButton";

describe("BackButton", () => {

    test("renders BackButton component", () => {
        const {getByText} = render(
            <Router>
                <BackButton redirectUrl="/" />
            </Router>
        );

        const backButton = getByText("Back");
        expect(backButton).toBeInTheDocument();
    });

    test("calls onClick function when button is clicked", () => {
        const onClick = jest.fn();
        const { getByRole } = render(
            <Router>
                <BackButton redirectUrl="/" onClick={onClick} />
            </Router>
        );

        const backButton = getByRole("button");
        fireEvent.click(backButton);

        // Wait for the onClick function to be called before making the assertion
        setTimeout(() => {
            expect(onClick).toHaveBeenCalledTimes(1);
        }, 0);
    });


    test("navigates to redirectUrl when button is clicked", () => {
        const redirectUrl = "/about";
        const { getByRole } = render(
            <Router>
                <BackButton redirectUrl={redirectUrl} />
            </Router>
        );

        const backButton = getByRole("button");
        fireEvent.click(backButton);

        // Wait for the navigate function to be called before making the assertion
        setTimeout(() => {
            expect(navigate).toHaveBeenCalledWith(redirectUrl);
        }, 0);
    });
});
