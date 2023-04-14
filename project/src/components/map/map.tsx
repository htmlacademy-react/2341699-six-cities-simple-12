import { useEffect, useRef, useState } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../common/constants';
import City from '../../types/city';
import useMap from '../../hooks/use-map';
import Offer from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getActiveOffer } from '../../store/main-data/selectors';

type MapProps = {
  containerClassNames: string | undefined;
  city: City;
  offers: Offer[];
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

function Map({ containerClassNames, city, offers }: MapProps): JSX.Element {

  const activeOffer = useAppSelector(getActiveOffer);

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

      layerGroup.clearLayers();

      if (currentCity !== city) {
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
        setCurrentCity(city);
      }

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
