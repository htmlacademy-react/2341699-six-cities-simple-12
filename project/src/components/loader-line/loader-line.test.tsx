import { render } from '@testing-library/react';
import LoaderLine from './loader-line';

describe('Component: LoaderLine', () => {
  it('should render correctly', () => {
    const { container } = render(<LoaderLine />);
    expect(container.getElementsByClassName('loader-line').length).toBe(1);
  });
});
