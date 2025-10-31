import {render, screen} from '@testing-library/react';
import Loading from './Loading';
import '@testing-library/jest-dom';

test('Loading component render ho raha hai', () => {
    render(<Loading />);

    except(true).toBe(true);
});