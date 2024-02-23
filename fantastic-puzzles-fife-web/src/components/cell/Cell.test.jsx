import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cell from './Cell';

describe('Cell', () => {
    it('renders correctly with white background', () => {
        const { container } = render(<Cell isBlack={false} />);
        expect(container.firstChild).toHaveClass('whiteCell');
    });

    it('renders correctly with yellow background', () => {
        const { container } = render(<Cell isBlack={true} />);
        expect(container.firstChild).toHaveClass('blackCell');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        const { container } = render(<Cell onClick={handleClick} />);
        fireEvent.click(container.firstChild);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('sets focus when isActive is true', () => {
        const { container } = render(<Cell isActive={true} />);
        expect(container.firstChild).toHaveFocus();
    });

    it('only allows single uppercase letter input', () => {
        const { container } = render(<Cell isBlack={false} />);
        const cell = container.firstChild;
        fireEvent.input(cell, { target: { textContent: 'a' } });
        expect(cell).toHaveTextContent('A');
        fireEvent.input(cell, { target: { textContent: 'A' } });
        expect(cell).toHaveTextContent('A');
        fireEvent.input(cell, { target: { textContent: 'AB' } });
        expect(cell).toHaveTextContent('');
    });

    it('renders with default class when no props are passed', () => {
        const { container } = render(<Cell />);
        expect(container.firstChild).toHaveClass('whiteCell');
    });

    it('renders with additional class when className prop is passed', () => {
        const { container } = render(<Cell className="cell whiteCell" />);
        expect(container.firstChild).toHaveClass('cell whiteCell');
    });

    it('does call onClick when disabled prop is passed', () => {
        const handleClick = jest.fn();
        const { container } = render(<Cell onClick={handleClick} disabled={true} />);
        fireEvent.click(container.firstChild);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('displays the correct letter when input is changed', () => {
        const { container } = render(<Cell isBlack={false} />);
        const cell = container.firstChild;
        fireEvent.input(cell, { target: { textContent: 'A' } });
        expect(cell).toHaveTextContent('A');
        fireEvent.input(cell, { target: { textContent: 'B' } });
        expect(cell).toHaveTextContent('B');
    });

    it('renders the row and column data attributes', () => {
        const { container } = render(<Cell row={3} col={4} />);
        const cell = container.firstChild;
        expect(cell).toHaveAttribute('data-row', '3');
        expect(cell).toHaveAttribute('data-col', '4');
    });

    it('renders the word number and clue data attributes', () => {
        const { container } = render(<Cell wordNumber={2} clue="Across" />);
        const cell = container.firstChild;
        expect(cell).toHaveAttribute('data-word-number', '2');
        expect(cell).toHaveAttribute('data-clue', 'Across');
    });

});
