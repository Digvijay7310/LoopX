import {render, screen} from '@testing-library/react';
import CommentInput from './CommentInput';
import '@testing-library/jest-dom';

test('Comments Section component render ho raha hai', () => {
    render(<CommentInput />);

    expect(true).toBe(true);
});