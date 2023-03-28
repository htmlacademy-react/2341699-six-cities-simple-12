import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { LayerGroup, Map, TileLayer } from 'leaflet';
import City from '../types/city';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
  scrollWheelZoom?: boolean
): [Map | null, LayerGroup | null] {

  const [map, setMap] = useState<Map | null>(null);
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {

      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: scrollWheelZoom ?? true,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      const markerLayerGroup = new LayerGroup().addTo(instance);

      setMap(instance);
      setLayerGroup(markerLayerGroup);

      isRenderedRef.current = true;
    }
  }, [mapRef, city, scrollWheelZoom]);

  return [map, layerGroup];
}

export default useMap;
