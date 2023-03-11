import Offer from '../types/Offer';

export const Offers: Offer[] = [
  {
    id: 1,
    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',

  },
  {
    id: 2,
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 4.8,
    title: 'Wood and stone place',
    type: 'Private room',
  },
  {
    id: 3,
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 4.8,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 4,
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
];
