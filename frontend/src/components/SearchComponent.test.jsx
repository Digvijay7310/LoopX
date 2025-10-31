import {render, screen} from '@testing-library/react';
import SearchComponent from './SearchComponent';
import '@testing-library/jest-dom';

test('SearchComponent component render ho raha hai', () => {
    render(<SearchComponent />);

    expect(true).toBe(true);
});