import React from 'react';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  [key: string]: any;
}

const GoogleMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  zoom = 15,
  ...rest
}) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=${zoom}`;

  return (
    <div {...rest}>
      <iframe
        width="100%"
        height="100%"
        className="border-0 aspect-video"
        src={mapUrl}
        allowFullScreen
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
