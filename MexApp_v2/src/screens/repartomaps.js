import MapView, { Marker } from 'react-native-maps';
import React,{useState,useEffect} from 'react';
import { StyleSheet ,Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';


function RepartosMaps(props){
    const context=props.route.params
    const [milatitusd,setMilatitud]=useState(19.3910038)
    const [milongitud,setMilongitud]=useState(-99.2837003)
    useEffect(() => {  
      geolocation()
    }, []);

    const geolocation=()=>{
      //console.log("actualizando localozacion")
          Geolocation.getCurrentPosition(
              (position) => {
                var Region ={
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }
                setMilatitud(position.coords.latitude)
                setMilongitud(position.coords.longitude)
             // moveToNewRegion(position.coords.latitude,position.coords.longitude)
      
              },
              (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
       
      
      }
    return (
        <MapView
          style={styles.map}
          followsUserLocation={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: context.latitude,
            longitude: context.longitude,
            latitudeDelta:5,
            longitudeDelta: 5,
          }}
        >
          {/* Agregar el marcador */}
          <Marker
            coordinate={{ latitude: context.latitude, longitude:context.longitude }}
            title={context.name}
            description={context.direction}
          />
            <Marker
      
      coordinate={{
        latitude: milatitusd,
        longitude: milongitud,
      }}
      title={"Mi ubicación"}
      description="unidad localizada">
         <Image source={require('../drawables/camion2.png')} style={{height: 30, width:40,resizeMode:'contain' }} />
     </Marker>
        </MapView>
      );


}
const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  
  export default RepartosMaps