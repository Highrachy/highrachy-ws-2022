import React from 'react';
import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  height: '512px',
  width: '100%',
};

const center = {
  lat: 6.428802400217264,
  lng: 3.429558495703779,
};

const position = center;

const options = { closeBoxURL: '', enableEventPropagation: true };

const onLoad = (marker) => {
  console.log('marker: ', marker);
};

function MyComponent() {
  return (
    <section className="google-map">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          <Marker
            onLoad={onLoad}
            position={position}
            animation={2}
            icon={'/assets/img/icons/map.png'}
          />
        </GoogleMap>
      </LoadScript>
    </section>
  );
}

export default React.memo(MyComponent);
