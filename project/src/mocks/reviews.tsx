import Review from '../types/review';

export const Reviews: Review[] = [
  {
    'comment': 'This is really good place',
    'date': '2023-03-11T21:04:43.382Z',
    'id': 2,
    'rating': 5,
    'user': {
      'avatarUrl': 'https://i.pravatar.cc/54?u=fake2@pravatar.com',
      'id': 2,
      'isPro': false,
      'name': 'Vasya Pupkin'
    }
  },
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2022-12-11T21:04:43.382Z',
    'id': 1,
    'rating': 4,
    'user': {
      'avatarUrl': 'https://i.pravatar.cc/54?u=fake@pravatar.com',
      'id': 1,
      'isPro': false,
      'name': 'Ivan Ivanov'
    }
  },
];
