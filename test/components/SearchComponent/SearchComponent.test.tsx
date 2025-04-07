import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchComponent from '@/components/shared/SearchComponent/SearchComponent';

describe('SearchComponent', () => {
  const mockSetValue = jest.fn();
  const mockResetPage = jest.fn();
  const label = 'Search character';

  beforeEach(() => {
    mockSetValue.mockClear();
    mockResetPage.mockClear();
  });

  it('should render correctly with basic props', () => {
    render(
      <SearchComponent
        label={label}
        value=""
        setValue={mockSetValue}
        resetPage={mockResetPage}
        disabled={false}
      />
    );

    expect(screen.getByPlaceholderText(label)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should call setValue and resetPage when the input changes', () => {
    render(
      <SearchComponent
        label={label}
        value=""
        setValue={mockSetValue}
        resetPage={mockResetPage}
        disabled={false}
      />
    );

    const input = screen.getByPlaceholderText(label);
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(mockSetValue).toHaveBeenCalledWith('Rick');
    expect(mockResetPage).toHaveBeenCalledWith(1);
  });

  it('should disable the input if disabled is true', () => {
    render(
      <SearchComponent
        label={label}
        value=""
        setValue={mockSetValue}
        resetPage={mockResetPage}
        disabled={true}
      />
    );

    const input = screen.getByPlaceholderText(label);
    expect(input).toBeDisabled();
  });
});
