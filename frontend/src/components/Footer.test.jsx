import {render, screen} from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';

test('Footer component render ho raha hai', () => {
    render(<Footer />);

    expect(screen.getByText(/Share/i)).toBeInTheDocument();
});