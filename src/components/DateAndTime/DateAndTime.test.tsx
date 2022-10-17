import { render, screen } from '@testing-library/react';
import DateAndTime from './DateAndTime';

describe('Clock', () => {
  test('should render', () => {
    render(<DateAndTime />);
    const RenderedClock = screen.getByLabelText('date-and-time');
    expect(RenderedClock).toBeInTheDocument();
  });
  test('should have date displayed', () => {
    const date = new Date();
    render(<DateAndTime />);
    const expectedDate = date.toDateString();
    const RenderedDate = screen.getByLabelText('date');
    expect(RenderedDate).toBeInTheDocument();
    expect(RenderedDate).toHaveTextContent(expectedDate);
  });
  test('should have time displayed', () => {
    const date = new Date();
    const dateTime = date.toLocaleTimeString();
    render(<DateAndTime />);
    const RenderedTime = screen.getByLabelText('time');
    expect(RenderedTime).toBeInTheDocument();
    expect(RenderedTime).toHaveTextContent(`Time: ${dateTime}`);
  });
});
