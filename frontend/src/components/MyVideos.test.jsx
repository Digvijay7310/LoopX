import {render, screen} from '@testing-library/react';
import MyVideos from './MyVideos';
import '@testing-library/jest-dom';

test('My videos component render ho raha hai', () => {
    render(<MyVideos />);

    expect(screen.getByText(/views/i)).toBeInTheDocument();
});