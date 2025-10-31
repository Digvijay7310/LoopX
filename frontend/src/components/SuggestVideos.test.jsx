import {render, screen} from '@testing-library/react';
import SuggestVideos from './SuggestVideos';
import '@testing-library/jest-dom';

test('SuggestVideos component render ho raha hai', () => {
    render(<SuggestVideos />);

    expect(screen.getByText(/views/i)).toBeInTheDocument();
});