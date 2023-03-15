type Offer = {
  id: number;

  /*
    bedrooms: number
    maxAdults: number;
    city: {
      location: {
        latitude: number;
        longitude: number;
        zoom: number;
      }
      name: string;
    };
    description: string;
    goods: string[];
    host: {
      avatarUrl: string;
      id: number;
      isPro: boolean;
      name: string;
    };
    images: string[];

    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  */

  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export default Offer;
