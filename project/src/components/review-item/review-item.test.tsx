import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../common/mocks';
import { getReviewTime } from '../../common/utils';
import ReviewItem from './review-item';

const fakeReview = makeFakeReview();
const fakeReviewTime = getReviewTime(fakeReview.date);

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {

    render(<ReviewItem item={fakeReview} />);

    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeReviewTime)).toBeInTheDocument();

  });
});
