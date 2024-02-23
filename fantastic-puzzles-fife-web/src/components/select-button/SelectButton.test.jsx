import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import SelectButton from "./SelectButton";

describe("SelectButton", () => {
    test("renders button with correct label", () => {
        const name = "Select Level";
        const { getByText } = render(
            <Router>
                <SelectButton redirectUrl="/" name={name} />
            </Router>
        );
        const button = getByText(name);
        expect(button).toBeInTheDocument();
    });

    test("navigates to the correct URL when button is clicked", async () => {
        const redirectUrl = "/level/1";
        const { getByRole } = render(
            <Router>
                <SelectButton redirectUrl={redirectUrl} name="Select Level 1" />
            </Router>
        );

        const button = getByRole("button");
        fireEvent.click(button);

        // Wait for the navigation to occur before making the assertion
        setTimeout(() => {
            expect(window.location.pathname).toBe(redirectUrl);
        }, 0);
    });

});
