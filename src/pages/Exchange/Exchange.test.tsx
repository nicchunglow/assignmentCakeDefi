import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';

import Exchange from 'pages/Exchange';
import { customAxios } from 'service/axios';

const mock = new MockAdapter(customAxios);

describe('Exchange', () => {
  test('should render', () => {
    render(<Exchange />);
    const ExchangeHeaderText = screen.getByLabelText('exchange-header-text');
    expect(ExchangeHeaderText).toBeInTheDocument();

    const ExchangeDateAndTime = screen.getByLabelText('date-and-time');
    expect(ExchangeDateAndTime).toBeInTheDocument();

    const ExchangeSwapTokenText = screen.getByLabelText('swap-token-text');
    expect(ExchangeSwapTokenText).toBeInTheDocument();

    const ExchangeSwapTokenSelect = screen.getByRole('combobox', {
      name: 'swap-token-select',
    });
    expect(ExchangeSwapTokenSelect).toBeInTheDocument();

    const ExchangeReceiveTokenText =
      screen.getByLabelText('receive-token-text');
    expect(ExchangeReceiveTokenText).toBeInTheDocument();

    const ExchangeReceiveTokenSelect = screen.getByRole('combobox', {
      name: 'receive-token-select',
    });
    expect(ExchangeReceiveTokenSelect).toBeInTheDocument();
  });
  describe('Input', () => {
    test('should have input display BTC to ETH ', async () => {
      mock.onGet('/coins/bitcoin').reply(200, {
        success: true,
        market_data: {
          current_price: {
            eth: 2,
          },
        },
      });
      jest.useFakeTimers();
      render(<Exchange />);
      const swapTokenValue = 'bitcoin';
      const receiveTokenValue = 'ethereum';
      const SwapSelect = screen.getByLabelText('swap-token-select');
      const receiveSelect = screen.getByLabelText('receive-token-select');
      userEvent.selectOptions(SwapSelect, swapTokenValue);
      userEvent.selectOptions(receiveSelect, receiveTokenValue);
      await waitFor(() => {
        expect(SwapSelect).toHaveValue(swapTokenValue);
        expect(receiveSelect).toHaveValue(receiveTokenValue);
      });
      const SwapInput = screen.getByLabelText('swap-input');
      fireEvent.change(SwapInput, { target: { value: 2 } });
      const ReceiveInput = screen.getByLabelText('receive-input');
      expect(ReceiveInput).toBeInTheDocument();
      jest.advanceTimersByTime(1000);
      await waitFor(() => {
        expect(ReceiveInput).toHaveValue('4');
      });
    });
  });
});
