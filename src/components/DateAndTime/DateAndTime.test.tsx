import { render, screen } from '@testing-library/react';
import DateAndTime from './DateAndTime';

describe('Clock', () => {
  test('should render', () => {
    render(<DateAndTime />);
    const RenderedClock = screen.getByLabelText('date-and-time');
    expect(RenderedClock).toBeInTheDocument();
  });
  test('should have time displayed', () => {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    const expectedTime = `${hh}:${mm}:${ss}`;
    render(<DateAndTime />);
    const RenderedTime = screen.getByLabelText('time');
    expect(RenderedTime).toBeInTheDocument();
    expect(RenderedTime).toHaveTextContent(`Time: ${expectedTime}`);
  });
});
