import {render, screen} from '@testing-library/react';
import CommentInput from './CommentInput';
import '@testing-library/jest-dom';

test('Comment Input component render ho raha hai', () => {
    render(<CommentInput />);

    expect(screen.getByText(/Comment:/i)).toBeInTheDocument();
});