import {render, screen} from '@testing-library/react';
import Logo from './Logo';
import '@testing-library/jest-dom';

test('Logo component render ho raha hai', () => {
    render(<Logo />);

    expect(screen.getByText(/LoopX/i)).toBeInTheDocument();
});