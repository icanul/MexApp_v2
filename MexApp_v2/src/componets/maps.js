import React, { useEffect, useState ,useRef } from 'react';
import MapView ,{Polyline,Marker}from 'react-native-maps';
import { View,Text ,Image,Alert,Pressable,} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, } from 'react-native';
import Operations from '../utils/operations'
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';




function Maps (props){
  const navigation = useNavigation();
  const GOOGLE_MAPS_APIKEY = 'AIzaSyARkfKeDaxTgw9J5A50Aq48gNaA6rcVLRo';
  const [coordinates, setCoordinates] = useState([]);
  const [bandera,setbandera]=useState(1)
  const [milatitusd,setMilatitud]=useState(19.3910038)
  const [milongitud,setMilongitud]=useState(-99.2837003)
  const [points,setPoints]=useState([])
  const [region,setRegion]=useState({})
  const [fullScreen,onchangerScreen]= useState('45%')
  const [top,onchangertop]= useState('85%')
  const [count,setcount]=useState(1)
  const mapRef = useRef(null);
  const [mapRotation, setMapRotation] = useState(0);
  const origin = { latitude: 37.7749, longitude: -122.4194 }; // San Francisco, CA
  const destination = { latitude: 34.0522, longitude: -118.2437 }; 
  const [beslatitud,setbestlatitud]=useState(0.0)
  const [beslongitud,sebestlongitud]=useState(0.0)
  const [traficc,settraffic]= useState(true)


  useEffect(() => {
    setbestlatitud(milatitusd)
    sebestlongitud(milatitusd)
 
    getruta()

    console.log("solo una vez")
    const interval = setInterval(() => {
      //console.log('no mames')
      if (Platform.OS === 'android') {
        requestLocationPermission()
      } else {
       geolocation()
       console.log('permission ios')
      }
     
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const openMap=()=>{
   navigation.navigate('mapscreen',{data:props,points:points})

  }
async function getruta(){
 // console.log('buscando'+props.solicitud)
 var arraypoint=[]

  try {
    const pointsrest=await Api.getruta(props.solicitud)
    let Str= pointsrest.replace(']]',']')
    let Str2=Str.replace('[[',']]')
    let arr = Str2 .split('],['); 

    //for (var i = 0; i < 9; i++) {
    for(var i=1;i<arr.length; i++){
      let iso=arr[i]
      let iteration=iso.split(',')
      try {
        var lntlng ={
          latitude: parseFloat(iteration[0].replace('[','')),
          longitude: parseFloat(iteration[1].replace(']','')),
        }
        arraypoint.push(lntlng)
        
      }
       catch (error) {
        
      }
   
     
    }
    setbandera(0)


    setPoints(arraypoint)
    storeData(arraypoint)
   // console.log(points)
    
  } catch (error) {
    dataOffline()
    console.log(error)
    
  }
}
const fullScreenchanger=()=> {
  setcount(count+1)
  console.log(count)
  var validate  =count % 2
  if(validate==1){
    onchangerScreen('97%')
    onchangertop('91%')
  }else{
    onchangerScreen('47%')
    onchangertop('85%')
  }
}
const getBestPoint=()=>{
  var latitudeO=parseFloat(props.lto)
  var longitudeO=parseFloat(props.lno)
  var latitudeD=parseFloat(props.ltd)
  var longitudeD=parseFloat(props.lnd)
  var waypointlistt=[]
  const arraydistance=[]
  const arraydistance2
  =[]

  var miubication={
    latitude:milatitusd,
    longitude:milongitud
  }
  for (let i = 0; i <= points.length-1; i++) {
    let distance=Operations.calculateDistance(miubication,points[i])
    arraydistance.push(distance)
  }

  const minValue = Math.min(...arraydistance);
  const posicion = arraydistance.indexOf(minValue);
  var bestpoin=points[posicion]
  console.log('chupame un webo'+bestpoin.latitude)
  setbestlatitud(bestpoin.latitude)
  sebestlongitud(bestpoin.longitude)
  var waypoints_destiny=props.waypoints_destiny.replace("waypoints=","")
  var arraywaypoint=waypoints_destiny.split("%7C");
  console.log(arraywaypoint)
  for(let i=0;i<=arraywaypoint.length;i++)
  {
    try {
      let partir=arraywaypoint[i].split(',')
      var coordinate={"latitude": partir[0], "longitude": partir[1]}
      waypointlistt.push(coordinate)
      
    } catch (error) {
      
    }

  }
  for (let i = 0; i <= waypointlistt.length; i++) {
    try {
      let distance=Operations.calculateDistance(miubication,waypointlistt[i])
      arraydistance2.push(distance)
      
    } catch (error) {
      
    }
   
  }
  console.log(arraydistance2)
  const minValue2 = Math.min(...arraydistance2);
  const posicion2 = arraydistance2.indexOf(minValue2);
  console.log(posicion2)
  console.log(waypointlistt[posicion2])




  const concate=[]
  concate.push(milatitusd+','+milongitud)
  for (let i = posicion2; i <= waypointlistt.length-1; i++) {
    //            nueva.add(waypoints.getLatitud()+","+waypoints.getLongitud()+"/");
    concate.push(waypointlistt[i].latitude.toString()+','+waypointlistt[i].longitude.toString())
 
  }
  concate.push(latitudeD+','+longitudeD)
 
  var r1=concate.join("/")
  console.log(r1)
 
  var origendestino='?api=1&origin='+milatitusd +','+milongitud+'&destination='+latitudeD+','+longitudeD+'/'
  var url='https://www.google.com/maps/dir/'+r1
  console.log(url)

  Linking.openURL(url)
  .then((result) => {
    if (result) {
      console.log('Se abrió Google Maps correctamente.');
    } else {
      console.error('No se pudo abrir Google Maps.');
    }
  })
  .catch((error) => {
    console.error('Error al abrir Google Maps: ', error);
  });

  


}

const enableTraffic=()=>{
  settraffic(!traficc)
  
}
const storeData = async (value) => {
  try {
     
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@mapa_storage', jsonValue)
    console.log("ruta guardada correctamente")
    
  } catch (e) {
    console.log(e)
  }
}
const dataOffline = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@mapa_storage')
    var convert=JSON.parse(jsonValue)
    setPoints(convert)
    setbandera(0)
    
  } catch(e) {
      
      setIsload(0)
   console.log(e)
  }
}
const mapa=(props)=>{
  
  var latitudeO=parseFloat(props.lto)
  var longitudeO=parseFloat(props.lno)
  var latitudeD=parseFloat(props.ltd)
  var longitudeD=parseFloat(props.lnd)

  
  //console.log("points")



  return(
    <View     style={{with:'100%',height:fullScreen, }}>

    
    
    <MapView
        style={{with:'100%',height:"100%"}}
        ref={mapRef}
    userLocationCalloutEnabled={true}
    showsUserLocation={true}
    followsUserLocation={true}
    showsMyLocationButton={true}
    showsTraffic={traficc}  
    initialRegion={{
      latitude: milatitusd,
      longitude: milongitud,
      latitudeDelta: 1,
      longitudeDelta:1,
      
    }}

    rotateEnabled={true} // Permite rotar el mapa con gestos
 
    >

     <Marker
      
      coordinate={{
        latitude: milatitusd,
        longitude: milongitud,
      }}
      onPress={openMap}
      title={"Mi ubicación"}
      description="unidad localizada">
         <Image source={require('../drawables/camion2.png')} style={{height: 30, width:40,resizeMode:'contain' }} />
     </Marker>
     <Marker
      
      coordinate={{
        latitude: latitudeO,
        longitude: longitudeO,
      }}
  
      title={"origen"}
      description={props.origen} >
         <Image source={require('../drawables/marker_blue.png')} style={{height: 30, width:40,resizeMode:'contain' }} />
     </Marker>
     <Marker
      
      coordinate={{
        latitude: latitudeD,
        longitude: longitudeD,
      }}
      title={"destino"}
      description={props.destino} >
         <Image source={require('../drawables/marker_green.png')} style={{height: 30, width:40,resizeMode:'contain' }} />
     </Marker>

   { /* <Marker
      
      coordinate={{
        latitude: 19.708380000000002,
        longitude: -99.20257000000001,
      }}
      title={"no mames cabron"}
      description={props.destino} >
         <Image source={require('../drawables/camera.png')} style={{height: 30, width:40,resizeMode:'contain' }} />
     </Marker>*/ }
   
     <Polyline
     coordinates={points}
              strokeColor="#0000FF"
              strokeWidth={4}
             />
  
    </MapView>

    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: top, //for center align
         
            alignSelf: 'flex-end' //for align to right
        }}
    >
            <Pressable style={{width:40,height:40,backgroundColor:'#eaeaeacc',alignItems: 'center',
            alignContent:'center',marginRight:10,}} onPress={fullScreenchanger}>
              <Image 
              
              style={{width:25,height:25,resizeMode:'contain',alignItems: 'center',marginTop:7}}
              source={require('../drawables/full.png')}/>
            </Pressable>
         


    </View>
    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: top, //for center align
            alignSelf: 'flex-start' //for align to right
        }}
    >
            <Pressable style={{width:40,height:40,backgroundColor:'#eaeaeacc',alignItems: 'center',
            alignContent:'center',marginLeft:10,}} onPress={enableTraffic}>
              <Image 
              
              style={{width:30,height:30,resizeMode:'contain',alignItems: 'center',marginTop:7}}
              source={require('../drawables/traffic.png')}/>
            </Pressable>
         


    </View>
   
    </View>

  )
}
const fail=()=>{
  return(
    <View>
      <Text>espere ...</Text>
    </View>

  )
}
async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      geolocation()
    
    
    } else {
      console.log("location permission denied")
     
    }
  } catch (err) {
    console.warn(err)
  }
}
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
          setRegion(Region)
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
if(bandera==1){
  return(
    fail(props)
  )
}
else{
  return(
    mapa(props)
  )


}


 

}

export default Maps