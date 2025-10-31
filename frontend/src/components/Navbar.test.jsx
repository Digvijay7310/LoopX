import {render, screen} from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

test('Navbar component render ho raha hai', () => {
    render(<Navbar />);

    expect(screen.getByText(/FullName/i)).toBeInTheDocument();
});