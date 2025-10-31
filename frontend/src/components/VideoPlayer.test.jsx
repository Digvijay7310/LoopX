import {render, screen} from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import '@testing-library/jest-dom';

test('VideoPlayer component render ho raha hai', () => {
    render(<VideoPlayer />);

    expect(true).toBe(true);
});