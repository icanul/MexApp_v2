import React, { useEffect, useState ,useRef } from 'react';
import MapView ,{Polyline,Marker}from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { Image } from 'react-native';
import Operations from '../utils/operations'


function MapScreen(props){
  const context=props.route.params.data
  const mapRef = useRef(null);
  const [milatitusd,setMilatitud]=useState(19.3910038)
  const [milongitud,setMilongitud]=useState(-99.2837003)
  const [points,setPoints]=useState([])
  const [region, setRegion] = useState({
        latitude: 19.3910038,
        longitude: -99.2837003,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
  
  const [beslatitud,setbestlatitud]=useState(19.7074219)
  const [beslongitud,sebestlongitud]=useState(-99.20627619999999)

  useEffect(() => {
      console.log(context)
    
      setPoints(props.route.params.points)
  
           geolocation()        
      const interval = setInterval(() => {   
        updatelocation()   
        getBestPoint()  
      }, 1000);
      const interval2 = setInterval(() => {   
       geolocation()   
      }, 20000);
   return () => clearInterval(interval,interval2);
  }, []);


  const updatelocation=()=>{
    Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
          setMilatitud(position.coords.latitude)
          setMilongitud(position.coords.longitude)
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );      
  }



const geolocation=()=>{
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0021,
      longitudeDelta: 0.0021,
   
                
                  });
              setMilatitud(position.coords.latitude)
              setMilongitud(position.coords.longitude)
               if (mapRef.current) {    
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0021,
        longitudeDelta: 0.0021,
        
        }, 1000); // Animación en 1000ms
}
              //   moveToNewRegion(position.coords.latitude,position.coords.longitude)
        
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
                
        }
        const getBestPoint=()=>{
          var latitudeO=parseFloat(context.lto)
          var longitudeO=parseFloat(context.lno)
          var latitudeD=parseFloat(context.ltd)
          var longitudeD=parseFloat(context.lnd)
          var waypointlistt=[]
          const arraydistance=[]
          const arraydistance2=[]
        
          var miubication={
            latitude:milatitusd,
            longitude:milongitud
          }
          var ruta=props.route.params.points
          for (let i = 0; i <= ruta.length-1; i++) {
            let distance=Operations.calculateDistance(miubication,ruta[i])
        
            arraydistance.push(distance)
          }
        
       const minValue = Math.min(...arraydistance);
          const posicion = arraydistance.indexOf(minValue);
          var bestpoin=ruta[posicion]           
       setbestlatitud(bestpoin.latitude)
      sebestlongitud(bestpoin.longitude)
        
        }

    return(
    <MapView
    style={{with:'100%',height:"100%"}}
    ref={mapRef}
    region={region}
    userLocationCalloutEnabled={true}
    showsUserLocation={true}
    followsUserLocation={true}
    showsMyLocationButton={true}
    showsTraffic={false}  
    rotateEnabled={true}>

      <Marker
      coordinate={{
        latitude: milatitusd,
        longitude: milongitud,
      }}
      title={"Mi ubicación"}
      description="unidad localizada">
         <Image source={require('../drawables/camion2.png')} style={{height: 30, width:40,resizeMode:'contain' }} />    
     </Marker>

     <Marker
      coordinate={{
        latitude:parseFloat(context.lto),
        longitude: parseFloat(context.lno),
      }}
      title={"Origen : "+context.origen}
      description="unidad localizada">
         <Image source={require('../drawables/marker_blue.png')} style={{height: 30, width:40,resizeMode:'contain' }} />     
     </Marker>

     <Marker
      coordinate={{
        latitude:parseFloat(context.ltd),
        longitude: parseFloat(context.lnd),
      }}
      title={"Destino : "}
      description="unidad localizada">
         <Image source={require('../drawables/marker_green.png')} style={{height: 30, width:40,resizeMode:'contain' }} />    
     </Marker>
            <MapViewDirections
          origin={{ latitude: milatitusd, longitude:milongitud}}
          destination={{ latitude: beslatitud, longitude:beslongitud}}
          apikey={'AIzaSyARkfKeDaxTgw9J5A50Aq48gNaA6rcVLRo'}
          strokeWidth={3}
          strokeColor="hotpink"
          mode="DRIVING" // Puedes cambiar el modo según tus necesidades (por ejemplo, 'driving', 'walking', 'bicycling')
          waypoints={[]}/>
          <Polyline
              coordinates={points}
              strokeColor="#000"
              strokeWidth={4}
             />

    </MapView>
    )

}
export default MapScreen