import { render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  const mockOnChange = jest.fn();
  test('should render', () => {
    const mockList = [{ id: 'bitcoin', symbol: 'btc' }];
    render(<Select list={mockList} action="test" onChange={mockOnChange} />);
    const testNameText = 'test-token-select';
    const RenderedTestSelect = screen.getByRole('combobox', {
      name: testNameText,
    });
    expect(RenderedTestSelect).toBeInTheDocument();
  });
  test('should have placeholder option rendered', () => {
    const mockList = [{ id: 'bitcoin', symbol: 'btc' }];
    render(<Select list={mockList} action="test" onChange={mockOnChange} />);
    const testNameText = 'test-token-select';
    const RenderedTestSelect = screen.getByRole('combobox', {
      name: testNameText,
    });
    expect(RenderedTestSelect).toBeInTheDocument();

    const initialPlaceHolderOption = screen.getByRole('option', {
      name: 'test-option',
    });
    expect(initialPlaceHolderOption).toBeInTheDocument();
    expect(initialPlaceHolderOption).toHaveTextContent('Select token to test');
  });
  test('should have matching options rendered', () => {
    const mockList = [{ id: 'bitcoin', symbol: 'btc' }];
    render(<Select list={mockList} action="test" onChange={mockOnChange} />);
    const testNameText = 'test-token-select';
    const RenderedTestSelect = screen.getByRole('combobox', {
      name: testNameText,
    });
    expect(RenderedTestSelect).toBeInTheDocument();
    expect(RenderedTestSelect).toHaveLength(2);
  });
  test('should have an option disabled if props is present', () => {
    const mockList = [
      { id: 'bitcoin', symbol: 'btc' },
      { id: 'ethereum', symbol: 'eth' },
    ];
    render(
      <Select
        list={mockList}
        action="test"
        onChange={mockOnChange}
        optionToDisable="bitcoin"
      />,
    );
    const testNameText = 'test-token-select';
    const RenderedTestSelect = screen.getByRole('combobox', {
      name: testNameText,
    });
    expect(RenderedTestSelect).toBeInTheDocument();
    const FirstOption = screen.getByRole('option', {
      name: 'test-bitcoin-option',
    });
    expect(FirstOption).toBeDisabled();
    const SecondOption = screen.getByRole('option', {
      name: 'test-ethereum-option',
    });
    expect(SecondOption).not.toBeDisabled();
  });
});
