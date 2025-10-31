import {render, screen} from '@testing-library/react';
import Comments from './Comments';
import '@testing-library/jest-dom';

test('Comments component render ho raha hai', () => {
    render(<Comments />);

    expect(screen.getByText(/Comments/i)).toBeInTheDocument();
});