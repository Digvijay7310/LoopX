import {render, screen} from '@testing-library/react';
import VideoCard from './VideoCard';
import '@testing-library/jest-dom';

test('VideoCard component render ho raha hai', () => {
    render(<VideoCard />);

    expect(screen.getByText(/views/i)).toBeInTheDocument();
});