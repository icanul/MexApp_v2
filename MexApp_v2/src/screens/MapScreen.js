import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { Gyroscope } from 'react-native-sensors';

const MapScreen = () => {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [mapRotation, setMapRotation] = useState(0);

  useEffect(() => {
    const gyroscopeSubscription = Gyroscope.subscribe(({ x, y, z }) => {
      // Calcula la rotación en grados basándote en los datos del giroscopio
      const newRotation = Math.atan2(y, x) * (180 / Math.PI);
      setMapRotation(newRotation);
    });

    // Limpia la suscripción al desmontar el componente
    return () => gyroscopeSubscription.unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        rotateEnabled={false} // Deshabilita la rotación del mapa por gestos del usuario
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        rotate={mapRotation}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Marker" />
      </MapView>
    </View>
  );
};

export default MapScreen;
