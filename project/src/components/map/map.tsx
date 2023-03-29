import { useEffect, useRef, useState } from 'react';
import { Icon, Marker } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../common/constants';
import City from '../../types/city';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import Offer from '../../types/offer';

type MapProps = {
  containerClassNames: string | undefined;
  city: City;
  offers: Offer[];
  activeOffer?: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

function Map({ containerClassNames, city, offers, activeOffer }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const [map, layerGroup] = useMap(mapRef, city);
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
    if (map && layerGroup && city) {

      const addMarker = (offer: Offer) => {

        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            activeOffer && offer.id === activeOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(layerGroup);
      };

      if (currentCity !== city) {

        // если город уже был выбран, смещаем карту
        if (currentCity) {
          map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom, {
            animate: true,
            duration: 1
          });
        }

        setCurrentCity(city);
      }

      layerGroup.clearLayers();

      offers.forEach((offer) => {
        addMarker(offer);
      });

      // добавляем маркер если есть активное предложение и его нет в массиве предложений
      if (activeOffer && !offers.find((offer) => offer.id === activeOffer.id)) {
        addMarker(activeOffer);
      }
    }
  }, [map, layerGroup, offers, activeOffer, city, currentCity]);

  return (
    <section className={containerClassNames} ref={mapRef} />
  );
}

export default Map;
