import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../common/constants';
import { makeFakeReviews } from '../../common/mocks';
import { getReviewTime } from '../../common/utils';
import ReviewList from './review-list';

const mockStore = configureMockStore();

const fakeReviews = makeFakeReviews();

describe('Component: ReviewList', () => {

  it('should render correctly', () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      'PROPERTY-DATA': {
        reviews: fakeReviews,
        reviewsLoading: false,
      }
    });

    render(
      <Provider store={store}>
        <ReviewList offerId={1} />
      </Provider>
    );

    const fakeReviewTime = getReviewTime(fakeReviews[0].date);

    expect(screen.getByText(fakeReviews[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(fakeReviewTime)).toBeInTheDocument();

  });

  it('shoud show LoaderLine when reviewsLoading is true', () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      'PROPERTY-DATA': {
        reviews: [],
        reviewsLoading: true,
      }
    });

    render(
      <Provider store={store}>
        <ReviewList offerId={1} />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

  });

  it('shoud show ReviewForm when authorizationStatus is Auth', () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
      'PROPERTY-DATA': {
        reviews: [],
        reviewsLoading: true,
      }
    });

    render(
      <Provider store={store}>
        <ReviewList offerId={1} />
      </Provider>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();

  });

});
