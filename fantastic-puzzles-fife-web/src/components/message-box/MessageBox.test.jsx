import { render, screen, fireEvent } from '@testing-library/react';
import MessageBox from './MessageBox';

describe('MessageBox', () => {
    const message = 'Test Message';
    const buttons = [
        { text: 'Button 1', onClick: jest.fn() },
        { text: 'Button 2', onClick: jest.fn() },
    ];

    test('renders the message text', () => {
        render(<MessageBox message={message} buttons={buttons} open={true} />);
        const messageText = screen.getByText(message);
        expect(messageText).toBeInTheDocument();
    });

    test('renders the button texts', () => {
        render(<MessageBox message={message} buttons={buttons} open={true} />);
        buttons.forEach((button) => {
            const buttonText = screen.getByText(button.text);
            expect(buttonText).toBeInTheDocument();
        });
    });

    test('calls the button onClick functions when clicked', () => {
        render(<MessageBox message={message} buttons={buttons} open={true} />);
        buttons.forEach((button) => {
            const buttonElement = screen.getByText(button.text);
            fireEvent.click(buttonElement);
            expect(button.onClick).toHaveBeenCalled();
        });
    });
});
