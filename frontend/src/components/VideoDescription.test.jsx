import {render, screen} from '@testing-library/react';
import VideoDescription from './VideoDescription';
import '@testing-library/jest-dom';

test('VideoDescription component render ho raha hai', () => {
    render(<VideoDescription />);

    expect(screen.getByText(/Description/i)).toBeInTheDocument();
});