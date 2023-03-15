type Offer = {
  id: number;

  /*
    bedrooms: number
    maxAdults: number;

    description: string;
    goods: string[];
    host: {
      avatarUrl: string;
      id: number;
      isPro: boolean;
      name: string;
    };
    images: string[];
  */
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    }
    name: string;
  };
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;

  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export default Offer;
