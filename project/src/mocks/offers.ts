import Offer from '../types/offer';

export const Offers: Offer[] = [
  {
    id: 1,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },

    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
  },
  {
    id: 2,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },

    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 4.8,
    title: 'Wood and stone place',
    type: 'Private room',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
  },
  {
    id: 3,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },

    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 4.8,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
  },
  {
    id: 4,

    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },

    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
  },
];
