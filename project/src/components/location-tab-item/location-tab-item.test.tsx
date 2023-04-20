import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cities } from '../../common/constants';
import LocationTabItem from './location-tab-item';

describe('Component: LocationTabItem', () => {

  it('should render correctly when city is active', async () => {

    const fakeChangeCurrentLocation = jest.fn();
    const fakeCity = Cities.Amsterdam;

    render(
      <LocationTabItem
        city={fakeCity}
        isActive
        changeCurrentLocation={fakeChangeCurrentLocation}
      />
    );

    const link = screen.getByRole('link');

    expect(screen.getByText(fakeCity)).toBeInTheDocument();
    expect(link).toHaveClass('tabs__item--active');

    await userEvent.click(link);

    expect(fakeChangeCurrentLocation).toBeCalledTimes(1);
  });

  it('should render correctly when city is not active', () => {

    const fakeChangeCurrentLocation = jest.fn();
    const fakeCity = Cities.Amsterdam;

    render(
      <LocationTabItem
        city={fakeCity}
        isActive={false}
        changeCurrentLocation={fakeChangeCurrentLocation}
      />
    );

    expect(screen.getByText(fakeCity)).toBeInTheDocument();
    expect(screen.getByRole('link')).not.toHaveClass('tabs__item--active');

  });
});
