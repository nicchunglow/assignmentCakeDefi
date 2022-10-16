import { render, screen } from '@testing-library/react';
import Exchange from 'pages/Exchange';

describe('Home', () => {
  describe('Workshop', () => {
    test('should render workshop', () => {
      render(<Exchange />);
      const ExchangeHeaderText = screen.getByLabelText('exchange-header-text');
      expect(ExchangeHeaderText).toBeInTheDocument();
    });
  });
});
