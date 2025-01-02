import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { Icon, layerGroup, Marker } from 'leaflet';
import { CardProps } from '../../recources/types';

export type MapCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: MapCoordinates;
}

type MapProps = {
  city: City;
  points?: CardProps[];
  selectedPoint?: CardProps;
};

const defaultCustomIcon = new Icon({
  iconUrl: '../../../markup/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '../../../markup/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      {if (points) {
        points.forEach((point) => {
          const marker = new Marker({
            lat: point.location.latitude,
            lng: point.location.longitude
          });

          marker
            .setIcon(
              selectedPoint !== undefined && point.id === selectedPoint.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        });
      }
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, city]);

  return <div style={{ height: '100%' }} ref={mapRef} className='mapContainer'></div>;
}

export default Map;
