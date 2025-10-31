import {render, screen} from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';

test('Header component render ho raha hai', () => {
    render(<Header />);

    expect(true).toBe(true);
});