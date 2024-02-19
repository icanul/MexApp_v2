import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { StyleSheet } from 'react-native';

function RepartosMaps(props){
    const context=props.route.params


    return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: context.latitude,
            longitude: context.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Agregar el marcador */}
          <Marker
            coordinate={{ latitude: context.latitude, longitude:context.longitude }}
            title={context.name}
            description={context.direction}
          />
        </MapView>
      );


}
const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  
  export default RepartosMaps