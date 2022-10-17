import { render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  test('should render', () => {
    const mockList = ['test'];
    render(<Select list={mockList} action="test" />);
    const testNameText = 'test-token-select';
    const RenderedTestSelect = screen.getByRole('combobox', {
      name: testNameText,
    });
    expect(RenderedTestSelect).toBeInTheDocument();
  });
  test('should have placeholder option rendered', () => {
    const mockList = ['testToken'];
    render(<Select list={mockList} action="test" />);
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
    const mockList = ['testToken', 'testToken2', 'testToken3'];
    render(<Select list={mockList} action="test" />);
    const testNameText = 'test-token-select';
    const RenderedTestSelect = screen.getByRole('combobox', {
      name: testNameText,
    });
    expect(RenderedTestSelect).toBeInTheDocument();
    expect(RenderedTestSelect).toHaveLength(4);
  });
});
