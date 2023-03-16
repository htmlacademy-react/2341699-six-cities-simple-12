type Offer = {
  id: number;

  /*
    host: {
      avatarUrl: string;
      id: number;
      isPro: boolean;
      name: string;
    };

  */
  images: string[];
  description: string;
  goods: string[];
  bedrooms: number;
  maxAdults: number;
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
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
