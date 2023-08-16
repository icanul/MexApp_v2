import React, { useEffect, useState } from 'react';
import MapView ,{Polyline,Marker}from 'react-native-maps';
import { View,Text ,Image,Alert,Pressable,} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, } from 'react-native';
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';






function Maps (props){
  const [bandera,setbandera]=useState(1)
  const [milatitusd,setMilatitud]=useState(19.3910038)
  const [milongitud,setMilongitud]=useState(-99.2837003)
  const [points,setPoints]=useState([])
  const [region,setRegion]=useState({})
  const [fullScreen,onchangerScreen]= useState('45%')
  const [top,onchangertop]= useState('85%')
  const [count,setcount]=useState(1)


  useEffect(() => {
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
  console.log(points[17])
  console.log(milatitusd)

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
  var cnt_lat=(latitudeO+latitudeD )/2
  var cnt_long=(longitudeO+longitudeD )/2
  
  //console.log("points")



  return(
    <View     style={{with:'100%',height:fullScreen}}>

    
    
    <MapView
        style={{with:'100%',height:"100%"}}

    userLocationCalloutEnabled={true}
    showsUserLocation={true}
    followsUserLocation={true}
    showsMyLocationButton={true}
    showsTraffic={true}  
    initialRegion={{
      latitude: milatitusd,
      longitude: milongitud,
      latitudeDelta: 1,
      longitudeDelta:1,
    }}>

     <Marker
      
      coordinate={{
        latitude: milatitusd,
        longitude: milongitud,
      }}
      onPress={getBestPoint}
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
     <Polyline
     coordinates={points}
              strokeColor="#0000ff"
              strokeColors={['#7F0000']}
              strokeWidth={3}
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
            latitudeDelta: 2,
            longitudeDelta: 2,
          }
          setRegion(Region)
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