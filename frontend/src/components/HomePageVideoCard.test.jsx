import {render, screen} from '@testing-library/react';
import HomePageVideoCard from './HomePageVideoCard';
import '@testing-library/jest-dom';

test('Home page video card component render ho raha hai', () => {
    render(<HomePageVideoCard />);

    expect(true).toBe(true);
});