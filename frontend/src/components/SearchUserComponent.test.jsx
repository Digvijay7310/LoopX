import {render, screen} from '@testing-library/react';
import SearchUserComponent from './SearchUserComponent';
import '@testing-library/jest-dom';

test('SearchUserComponent component render ho raha hai', () => {
    render(<SearchUserComponent />);

    expect(true).toBe(true);
});