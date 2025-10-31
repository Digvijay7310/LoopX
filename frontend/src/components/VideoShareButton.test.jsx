import {render, screen} from '@testing-library/react';
import VideoShareButton from './VideoShareButton';
import '@testing-library/jest-dom';

test('VideoShareButton component render ho raha hai', () => {
    render(<VideoShareButton />);

    expect(screen.getByText(/Share/i)).toBeInTheDocument();
});