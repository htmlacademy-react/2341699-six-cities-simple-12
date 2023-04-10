type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export default Review;

export type NewReview = {
  offerId: number;
  comment: string;
  rating: number;
};
