/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Image,Text,StyleSheet, Modal, Pressable, Alert, TouchableOpacity}from 'react-native'
import messaging from '@react-native-firebase/messaging';
import NetInfo from "@react-native-community/netinfo";
import TravelDetails from './src/screens/travelDetails';
import LoginScreen from './src/screens/loginscreen';
import TopMenu from './src/componets/topmenu'
import Operador from './src/screens/operadorScreen';
import Unidad from './src/screens/unidadScreen';
import Contacs from './src/screens/contactScreen'
import Nom87 from './src/screens/nom87Screen';
import Nom87dDetail from './src/screens/nom87detail';
import OpenPdf from './src/componets/openPdf';
import ImageScreen from './src/screens/imageScreen';
import LiquidacionesScreen from './src/screens/liquidacionesScreen'
import DepositosScreen from './src/screens/depositosScreen';
import GatosScreen from './src/screens/gastoScreen'
import Liqdetail from './src/screens/liquidetailScreen'
import CameraScreen from './src/screens/cameraScreen'
import CameraDiesel from './src/screens/cameradieselScreen'
import CameraGasto from './src/screens/cameraGasto'
import EvidenciasScreen from './src/screens/evidenciasScreen'
import ObsScreen from './src/screens/obsScreen'
import PdfWeb from './src/componets/pdfweb'
import Instrucction from './src/screens/InstructionScreen';
import FuelScreen from './src/screens/fuelScreen'
import Cartaporte from './src/screens/cartaporteScreen'
import Api from'./src/api/tms'
import storageData from './src/utils/storageData';
import LiqPdfScreen from './src/screens/liquidacionpdfscreen'
import LogScreen from './src/screens/logScreen';
import Voicemodal from './src/modals/voicemodal'
import ReporterScreen from './src/componets/mto_tabs';
import Reporter from './src/componets/reporter';
import MtoDetail from './src/screens/mto_report';
import Pandape from './src/screens/pandape';
import Mexatrueke  from './src/screens/mexatrueke';
import MapScreen from './src/screens/MapScreen';
import packageJson from  './package.json'; // Asegúrate de ajustar la ruta según la ubicación de tu package.json
import { LogBox } from 'react-native';
import RepartosScreen from './src/screens/repartosScreen'
import RepartosMaps from './src/screens/repartomaps';
import OpenNotificaton from './src/modals/openNotification';
import Notification from './src/screens/notificationScreen';
import Incidencias_Screen from './src/screens/incidencia_solicitud';
import Send_Data from './src/utils/sendStorage';

LogBox.ignoreLogs(['new NativeEventEmitter']); 



/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Stack = createNativeStackNavigator();


const App  =()=> {
  //const netInfo = useNetInfo();
  const[is_logged, setLogget]=useState(0)
  const [isConnected, setIsConnected] = useState(false);
  const [actual_version, setversion] = useState('')
  const[is_conected,setConected]=useState(require('./src/drawables/online.png'))
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [messageData,setMessageData]= useState({})





useEffect(() => {
  // Suscribirse a los cambios en la conexión a Internet         setIsConnected(state.isConnected);
  requestUserPermission()
  global.version = packageJson.version//
  getData()
  messaging().onMessage(async remoteMessage => {
    setMessageData(remoteMessage.data)
    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    //openmessage()
  });

  const unsubscribe = NetInfo.addEventListener(state => {

    var stade_conection=state.isConnected
    var isInternetReachable=state.isInternetReachable
    var strength=state.details.strength
    if(stade_conection==true&&isInternetReachable==true){
      makeRequest()
    }else{
      setIsConnected(false)
      Alert.alert('No hay Conexión a INTERNET')
      setConected(require('./src/drawables/offline2.png'))

    }
  });

  // Desuscribirse cuando el componente se desmonte
  return () => {
    unsubscribe();
  };
}, []);


const openmessage=()=>{
  setModalVisible1(true)

}
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  // Crea una promesa que se rechaza después del tiempo especificado
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Tiempo de espera agotado')), timeout)
  );

  // Usa Promise.race para competir entre la promesa del fetch y la del timeout
  const fetchPromise = fetch(url, options);

  try {
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return response; // Devuelve la respuesta si fetch se completa a tiempo
  } catch (error) {
    // Maneja el error si fetch tarda más de lo esperado o falla
    console.error('Error en la petición:', error.message);
    throw error; // Lanza el error para que pueda ser manejado externamente
  }
};

const makeRequest = async () => {
  try {
    const response = await fetchWithTimeout('https://intranet.mexamerik.com');
    if (response.ok) {
      console.log('servidor en linea')
      setIsConnected(true);
      getevidence()
      saved_requests()
      setConected(require('./src/drawables/online.png'))

    } else {
      setIsConnected(false)
      setConected(require('./src/drawables/offline2.png'))
      Alert.alert('Error de Conexion','no se pudo conectar al srvidor remoto, se activara el modo sin conexion')
      console.error('Error en la respuesta:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
  }
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
  }else{
    console.log(' no Authorization status:', authStatus);

  }
}
const getevidence= async () => {
  const evidence= await storageData.consultData('@evidenciagasto')

  if(evidence!= null){
    var convert=JSON.parse(evidence)
    var id=convert.id
    var coment=convert.comment
    const data = {uri:convert.url, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
    const formData = new FormData()
    formData.append('file', data)
    try {
      const setevidence = await Api.setevidencegasto(formData,id)
      console.log(setevidence)
      const setcoment = await Api.setObsgasto(coment,id)
      console.log(setcoment)
      const delete_= await storageData.deleteData('@evidenciagasto')
      
    } catch (error) {
      
    }

  }

}
const saved_requests= async()=>{
  const send_incidencias = await Send_Data.send_incidencia()
  console.log(send_incidencias)



}
const getData = async () => {
  try {
    const user=await storageData.consultData('@user_storage')
    if(user!= null){
      var convert=JSON.parse(user)
        global.id_operador=convert.id
        global.nombre = convert.nombre;
        global.alias= convert.unidad;
        messaging()
        .subscribeToTopic(convert.id+"")
        .then(() => console.log('Subscribed to topic!: '+conv|  ert.id+""));  
        messaging()
        .subscribeToTopic('all')
        .then(() => console.log('Subscribed to topic!: '+'all'));  
        messaging()
        .subscribeToTopic("TODOS")
        .then(() => console.log('Subscribed to topic!: '+convert.id+"TODOS"));  
        setLogget(1)
      
    }
   
  } catch (error) {
    console.log("no hay usuario guardardo")
      setLogget(0)
    
  }


}
const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    global.fcmToken=fcmToken
  console.log(fcmToken);
  } 
 }


 

  return (
    <NavigationContainer>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
     <Voicemodal setModalVisible={setModalVisible}/>

      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      >
     <OpenNotificaton setModalVisible={setModalVisible1} messageData={messageData} />

      </Modal>
     <Stack.Navigator
     screenOptions={{
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      }}>
          {is_logged == 0 ? (
 <>
    <Stack.Screen 
     name="Login"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
        gesturesEnabled: false,
       
        title: 'Iniciar sesion' }}>
     {props => <LoginScreen {...props} setLogget={setLogget}/>}
     </Stack.Screen>
       </>
       ) : (
         // User is signed in
         <>
        
          <Stack.Screen 
     name="menu"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        gesturesEnabled: false,
        headerLeft :() => (
          <Pressable
          style={{ flexDirection:'row',}}
         /*/ onPress={() => setModalVisible(true)}/*/
          >

        
          <Image
          style={style.logo}
          source={require('./src/drawables/mexapp.png')}/>
          <Text style={{color:'#ce2517',justifyContent:'center',marginTop:10,fontWeight:'bold'}}>{actual_version}</Text>
           </Pressable>
        ),
        headerRight :() => (
          <TouchableOpacity
          onPress={makeRequest}
          >
          <Image
          style={style.logo2}
          source={is_conected}/>
          </TouchableOpacity>
        ),
        title: '' }}>
     {props => <TopMenu {...props} setLogget={setLogget} isConnected={isConnected} setversion={setversion} setConected={setConected}/>}
     </Stack.Screen>

     <Stack.Screen 
      name="operador" 
      component={Operador}  
      options={{
        unmountOnBlur: true,
        headerRight :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/mexapp.png')}/>
        ),
        gesturesEnabled: false,  
        title:"Datos"}}/>

<Stack.Screen 
       options={{
        unmountOnBlur: true,
        headerRight :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/mexapp.png')}/>
        ),
        gesturesEnabled: false,  
        title:global.alias}}
      name="unidad" 
      component={Unidad} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Contactos"}}
      name="contactos" 
      component={Contacs} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Norma 87"}}
      name="nom87" 
      component={Nom87} />
         <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Bitacora"}}
      name="nom87detail" 
      component={Nom87dDetail} />
       
       
       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="travelsdetails" 
      component={TravelDetails} />


<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="pdf" 
      component={OpenPdf} />

      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: false,
          gesturesEnabled: false,  
          title:""}}
      name="liqpdf" 
      component={LiqPdfScreen} />

      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="imagescreen" 
      component={ImageScreen} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Liquidaciones"}}
      name="liquidaciones" 
      component={LiquidacionesScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Detalle"}}
      name='liqdetail'
      component={Liqdetail} />

        <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Depositos"}}
      name='depositos'
      component={DepositosScreen} />

      
<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Gastos"}}
      name='gastos'
      component={GatosScreen} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name='camera'
      component={CameraScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name='cameragasto'
      component={CameraGasto} />


      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name='cameradiesel'
      component={CameraDiesel} />
      

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Incidencias"}}
      name='evidencias'
      component={Incidencias_Screen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Observaciones"}}
      name='observaciones'
      component={ObsScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: false,

          gesturesEnabled: false,  
          title:""}}
      name='pdfweb'
      component={PdfWeb} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Instrucciones"}}
      name='instrucciones'
      component={Instrucction} />
      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Asig. de Combustible"}}
      name='fuels'
      component={FuelScreen} />
          <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Carta porte"}}
      name='cartaporte'
      component={Cartaporte} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Archivo de Log"}}
      name='log'
      component={LogScreen} />

      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Reportes de mantenimiento"}}
      name='reporter'
      component={ReporterScreen} />
         <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Reportes de mantenimiento"}}
      name='reporterdetail'
      component={MtoDetail} />

           <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: false,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"pandape"}}
      name='pandape'
      component={Pandape} />

        <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: false,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Mexatrueke"}}
      name='mexatrueke'
      component={Mexatrueke} />


      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
      
          gesturesEnabled: false,  
          title:"Modo de navegacion"}}
      name='mapscreen'
      component={MapScreen} />
      
       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: false,
      
          gesturesEnabled: false,  
          title:"Modo de navegacion"}}
      name='repartosmap'
      component={RepartosMaps} />

      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
      
          gesturesEnabled: false,  
          title:"Repartos / Recoleción"}}
      name='Repartos'
      component={RepartosScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
      
          gesturesEnabled: false,  
          title:"Notificaciones"}}
      name='noty'
      component={Notification} />

       
      
        </>
    )}

    </Stack.Navigator>
  </NavigationContainer>

 


  );
};

const style=StyleSheet.create({
  logo:{
      width:95,
      height:45,
      resizeMode:'contain',
  },
  logo2:{
    width:35,
    height:35,
    resizeMode:'contain',
},
  menuicon:{
      width:26,
      height:26,
      resizeMode:'contain',
  },
 
  menu:{
      width:10,
      height:26,
      flex:1,
      flexDirection:"row",
      justifyContent:'flex-end'
  }

})



export default App;
