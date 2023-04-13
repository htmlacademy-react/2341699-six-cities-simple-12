import { render, screen } from '@testing-library/react';
import EmptySection from './empty-section';

describe('Component: EmptySection', () => {

  it('should render correctly', () => {

    const mockCityName = 'Samara';

    render(
      <EmptySection cityName={mockCityName} />
    );

    expect(screen.getByText(`We could not find any property available at the moment in ${mockCityName}`)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

});
