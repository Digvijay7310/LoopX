import {render, screen} from '@testing-library/react';
import WatchVideoLoading from './WatchVideoLoading';
import '@testing-library/jest-dom';

test('Watch video loading component render ho raha hai', () => {
    render(<WatchVideoLoading />);

    expect(true).toBe(true);
});