import { render } from "@testing-library/react";
import Spinner from "./spinner";

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);
    expect(container.getElementsByClassName('spinner-wrapper').length).toBe(1);
  });
});
