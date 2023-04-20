import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { makeFakeOffer } from '../../common/mocks';
import OfferCard from './offer-card';

const fakeOffer = makeFakeOffer();

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('Component: OfferCard', () => {

  it('should render correctly', () => {

    const handleSetActiveItem = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <OfferCard item={fakeOffer} setActiveItem={handleSetActiveItem} />
      </Router>
    );

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();

    expect(screen.getByAltText('Place')).toBeInTheDocument();
  });

  it('should set active offer after mouse enter', async () => {

    const handleSetActiveItem = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <OfferCard item={fakeOffer} setActiveItem={handleSetActiveItem} />
      </Router>
    );

    await userEvent.hover(screen.getByRole('listitem', { name: 'place-card' }));

    expect(handleSetActiveItem).toBeCalledTimes(1);
  });

  it('should redirect to offer after click', async () => {

    const handleSetActiveItem = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <OfferCard item={fakeOffer} setActiveItem={handleSetActiveItem} />
      </Router>
    );

    await userEvent.click(screen.getAllByRole('link')[0]);

    expect(history.location.pathname).toBe(`/offer/${fakeOffer.id}`);
  });

});
