import { render, screen } from '@testing-library/react';
import LoaderLine from './loader-line';

describe('Component: LoaderLine', () => {
  it('should render correctly', () => {
    render(<LoaderLine />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
