import Offer from '../types/offer';

export const Offers: Offer[] = [
  {
    id: 1,
    description: 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station.\nThe apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath.\n A terrace can be used in summer.',
    goods: [
      'Washer',
      'Towels',
      'Dishwasher',
      'Fridge',
      'Air conditioning',
      'Coffee machine',
      'Breakfast',
      'Laptop friendly workspace',
      'Baby seat',
      'Washing machine',
    ],
    maxAdults: 3,
    bedrooms: 2,
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
    description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
    goods: [
      'Laptop friendly workspace',
      'Towels',
      'Dishwasher',
      'Fridge',
      'Air conditioning',
    ],
    maxAdults: 1,
    bedrooms: 1,
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
    description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country.\nIn our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    goods: [
      'Washer',
      'Towels',
      'Dishwasher',
      'Fridge',
      'Air conditioning',
      'Coffee machine',
      'Breakfast',
      'Laptop friendly workspace',
      'Baby seat',
      'Washing machine'
    ],
    maxAdults: 3,
    bedrooms: 2,
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
    description: 'This is a place for dreamers to reset, reflect, and create. Designed with a "slow" pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    goods: [
      'Cabel TV',
      'Laptop friendly workspace',
      'Washer',
      'Towels',
      'Dishwasher',
      'Fridge',
      'Air conditioning',
      'Coffee machine',
      'Breakfast',
      'Baby seat',
      'Washing machine'
    ],
    maxAdults: 4,
    bedrooms: 3,
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
