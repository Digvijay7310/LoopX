import {render, screen} from '@testing-library/react';
import ReportVideoComponent from './ReportVideoComponent';
import '@testing-library/jest-dom';

test('ReportVideoComponent component render ho raha hai', () => {
    render(<ReportVideoComponent />);

    expect(screen.getByText(/Report/i)).toBeInTheDocument();
});