import {render, screen} from '@testing-library/react';
import ProfilePageLoading from './ProfilePageLoading';
import '@testing-library/jest-dom';

test('Profile page loading component render ho raha hai', () => {
    render(<ProfilePageLoading />);

    expect(true).toBe(true);
});