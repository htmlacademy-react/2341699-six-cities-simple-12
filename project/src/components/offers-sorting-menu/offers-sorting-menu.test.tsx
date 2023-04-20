import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortMenuItems } from '../../common/constants';
import OffersSortingMenu from './offers-sorting-menu';

describe('Component: OffersSortingMenu', () => {

  const menuItems = Object.values(SortMenuItems);

  it('should render correctly', async () => {

    const handleChangeSortType = jest.fn();

    render(<OffersSortingMenu onChangeSortType={handleChangeSortType} />);

    const listItems = screen.getAllByRole('listitem');
    const menuButton = screen.getByRole('button');
    const menuList = screen.getByRole('menu');

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(listItems.length).toBe(menuItems.length);
    expect(menuButton).toBeInTheDocument();

    await userEvent.click(menuButton);

    expect(menuList).toHaveClass('places__options--opened');

    await userEvent.click(listItems[0]);

    expect(handleChangeSortType).toBeCalledTimes(1);
  });

});
