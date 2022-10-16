import { render, screen } from '@testing-library/react';
import Exchange from 'pages/Exchange';

describe('Exchange', () => {
  describe('Header', () => {
    test('should render', () => {
      render(<Exchange />);
      const ExchangeHeaderText = screen.getByLabelText('exchange-header-text');
      expect(ExchangeHeaderText).toBeInTheDocument();
    });
  });
});
