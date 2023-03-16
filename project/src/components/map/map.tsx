import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../common/constants';
import City from '../../types/city';
import { Point, Points } from '../../types/point';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  containerClassNames: string | undefined;
  city: City;
  points: Points;
  selectedPoint?: Point | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({ containerClassNames, city, points, selectedPoint }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint && point.longitude === selectedPoint.longitude && point.latitude === selectedPoint.latitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section className={containerClassNames} ref={mapRef} />
  );
}

export default Map;
