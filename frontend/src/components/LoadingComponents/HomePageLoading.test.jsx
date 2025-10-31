import {render, screen} from '@testing-library/react';
import HomePageLoading from './HomePageLoading';
import '@testing-library/jest-dom';

test('Home Page Loading component render ho raha hai', () => {
    render(<HomePageLoading />);

    expect(true).toBe(true);
});