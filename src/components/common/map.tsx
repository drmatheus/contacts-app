import React, { useEffect, useRef } from 'react';
import useGoogleMapsApi from '../../hooks/useGoogleMapsApi';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
  [key: string]: any;
}

const GoogleMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  zoom = 15,
  className,
  ...rest
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const googleMapsApi = useGoogleMapsApi();

  useEffect(() => {
    if (googleMapsApi && mapRef.current && !mapInstance.current) {
      // Inicializa o mapa
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom,
      });

      // Adiciona o marcador
      markerRef.current = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: mapInstance.current,
      });
    } else if (mapInstance.current && markerRef.current) {
      // Atualiza a posição do marcador
      markerRef.current.setPosition({ lat: latitude, lng: longitude });
      mapInstance.current.setCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, zoom, googleMapsApi]);

  return (
    <div
      {...rest}
      className={`rounded-lg w-full h-96 shadow-lg ${className}`}
      ref={mapRef}
    />
  );
};

export default GoogleMap;
