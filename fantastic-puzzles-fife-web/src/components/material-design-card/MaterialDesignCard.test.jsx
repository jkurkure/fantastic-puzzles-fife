import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import MaterialDesignCard from "./MaterialDesignCard";

describe("MaterialDesignCard component", () => {
    const cardTitle = "Card Title";
    const redirectUrl = "/card-url";
    const backgroundImagePath = "/path/to/image.jpg";
    const content = "Card content";
    const longContent = "Long card content";

    it("renders the MaterialDesignCard component", () => {
        const { getByText } = render(
            <Router>
                <MaterialDesignCard
                    cardTitle={cardTitle}
                    redirectUrl={redirectUrl}
                    backgroundImagePath={backgroundImagePath}
                    content={content}
                    longContent={longContent}
                />
            </Router>
        );

        expect(getByText(cardTitle)).toBeInTheDocument();
        expect(getByText(content)).toBeInTheDocument();
        expect(getByText(longContent)).toBeInTheDocument();
    });

    it("navigates to redirectUrl when the card is clicked", () => {
        const navigate = jest.fn();
        const { getByRole } = render(
            <Router>
                <MaterialDesignCard
                    cardTitle={cardTitle}
                    redirectUrl={redirectUrl}
                    backgroundImagePath={backgroundImagePath}
                    content={content}
                    longContent={longContent}
                />
            </Router>
        );

        const card = getByRole("img");
        fireEvent.click(card);

        setTimeout(() => {
            expect(navigate).toHaveBeenCalledWith(redirectUrl);
        }, 0);
    });

    it("displays the card title", () => {
        const { getByText } = render(
            <Router>
                <MaterialDesignCard
                    cardTitle={cardTitle}
                    redirectUrl={redirectUrl}
                    backgroundImagePath={backgroundImagePath}
                    content={content}
                    longContent={longContent}
                />
            </Router>
        );

        expect(getByText(cardTitle)).toBeInTheDocument();
    });

    it("displays the card content", () => {
        const { getByText } = render(
            <Router>
                <MaterialDesignCard
                    cardTitle={cardTitle}
                    redirectUrl={redirectUrl}
                    backgroundImagePath={backgroundImagePath}
                    content={content}
                    longContent={longContent}
                />
            </Router>
        );

        expect(getByText(content)).toBeInTheDocument();
    });

    it("displays the long card content", () => {
        const { getByText } = render(
            <Router>
                <MaterialDesignCard
                    cardTitle={cardTitle}
                    redirectUrl={redirectUrl}
                    backgroundImagePath={backgroundImagePath}
                    content={content}
                    longContent={longContent}
                />
            </Router>
        );

        expect(getByText(longContent)).toBeInTheDocument();
    });

    it("displays the card image", () => {
        const { getByAltText } = render(
            <Router>
                <MaterialDesignCard
                    cardTitle={cardTitle}
                    redirectUrl={redirectUrl}
                    backgroundImagePath={backgroundImagePath}
                    content={content}
                    longContent={longContent}
                />
            </Router>
        );

        expect(getByAltText("material design card image")).toBeInTheDocument();
    });
});
