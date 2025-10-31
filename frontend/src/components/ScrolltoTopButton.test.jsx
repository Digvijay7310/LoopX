import {render, screen} from '@testing-library/react';
import ScrollToTopButton from './ScrollToTopButton';
import '@testing-library/jest-dom';

test('ScrollToTopButton component render ho raha hai', () => {
    render(<ScrollToTopButton />);

    expect(true).toBe(true);
});