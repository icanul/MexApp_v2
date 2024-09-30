import React, { useEffect, useState,useRef } from 'react';
import { View,Image,ScrollView,Text,RefreshControl, Pressable, Alert ,Modal} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/intranet'
import { WebView } from 'react-native-webview';
import InphograpicsList from '../containers/inphograpicsList'
import NetInfo from "@react-native-community/netinfo";
import packageJson from  '../../package.json'; // Asegúrate de ajustar la ruta según la ubicación de tu package.json
import WelcomeHome from './welcomehomeScreen';




var arrayimage = [];

function HomeScreen (props){
  
  const [items, setItems] = useState([]);
  const [Inphograpics_list,setInphograpics]= useState([])
  const webViewRef = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sizes, setsize]=React.useState('28%')
  const [count,setcount]=React.useState(0)
  const [modalVisible,setModalVisible]=useState(true)
  const appVersion = packageJson.version;
  const [url, setUrl] = useState('https://sites.google.com/logsys.com.mx/mexapp-avisos/p%C3%A1gina-principal');
  const [executionCount, setExecutionCount] = useState(0);
  
  

    useEffect(() => {
  
      if (executionCount < 2) {
        const timer = setTimeout(() => {
          
        //  console.log('estado de la conexion es '+ props.isConnected)
          if(props.isConnected){
            getData()
            messaging().onMessage(async remoteMessage => {
              if(remoteMessage.data.id_screen==1){
                onRefresh()
              }
            });
            setTimeout(() => {
              getInfographics()
            }, 8000);

          }else{
            getData()

          }
      
          setExecutionCount(prev => prev + 1);
        }, 2000); // 2 segundos de intervalo
  
        // Limpiar el timeout cuando el componente se desmonte
        return () => {
          setInphograpics([])
          setItems([]) 
          clearTimeout(timer)};
      }
  



    /*/  const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected==true&&state.isInternetReachable==true){
          setIsConnected(true);
        }
      });

      
       return () =>{
        unsubscribe();
        
        } /*/
      }, [executionCount]); // Dependencia en executionCount

    const handleNavigate = () => {
      if (url) {
        setUrl(url);
      }
    };

    const dimist=()=>{
      console.log('presss')
      if(count==0){
        setsize('0%')
        setcount(1)

      }else{
        setsize('28%')
        setcount(0)

      }

    }
    const onMessage = (event) => {
      // Event.data contiene la información enviada desde el WebView
      const selectedUrl = event.nativeEvent.data;
      setUrl(selectedUrl)
      console.log('URL seleccionado:', selectedUrl);
      // Puedes hacer lo que quieras con la URL seleccionada aquí
    };
    const injectJavaScript = `
    // Sobrescribe el comportamiento de clic para enviar el URL seleccionado a React Native
    document.addEventListener('click', function(e) {
      var target = e.target;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      if (target) {
        window.ReactNativeWebView.postMessage(target.href);
        e.preventDefault();
      }
    });
  `;
 
    const getInfographics= async()=> {
      console.log('buscando infografias')
    
      try {       
        console.log('executev infographics')
          const getinfographics= await Api.getInfographics(global.solicitud)
          var infographics=getinfographics.infographics_list
          var version=appVersion
            var imagenes=[]
          
           var count=0;
           console.log('buscando infographics')

           for(var i=0;i<infographics.length;i++){
          
            var document_url=infographics[i]['document_url']
            var longi = document_url.split(',')
            for(j=0;j<longi.length;j++){
              count++;
            
              var imagen=longi[j].replace('[','').replace(']','').replace(/'/,'')
              var json={
                'id':count,
                'image':imagen
              }
              imagenes.push(json)
            }
  
           }
           if(getinfographics.version==version){
          }
          else{
            props.setversion(getinfographics.description)
            Alert.alert(getinfographics.description)

          } 
           storeData(imagenes)
           setInphograpics(imagenes)
       //  console.log(Inphograpics_list)
   
      } catch (error) {
        console.log(error)        

      
        getsave()
      }

    }
    const getsave = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@infografias')
        var convert=JSON.parse(jsonValue)
      
        Inphograpics_list(convert)
       
      } catch(e) {
      // console.log(e)
       return ""
      }
    }

    const getData = async () => {
      console.log('')
        try {
          const jsonValue = await AsyncStorage.getItem('@user_storage')
          var convert=JSON.parse(jsonValue)
          var contactoslist=convert.cell_data
          var celula=contactoslist[0].cell__name
          global.celula=celula
          let lideresdeflota=contactoslist.filter(contactoslist=>contactoslist.kind_id==1)
          let phone=lideresdeflota[0].phone
          global.phone=phone
          setItems(convert)
        } catch(e) {
         //console.log(e)
         return ""
        }
      }

      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@infografias', jsonValue)
        } catch (e) {
        
        }
      }
      
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        webViewRef.current.reload(); 
        getInfographics()
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }


      if(props.isConnected){
        return(
          <ScrollView 
          style={{backgroundColor:'#c0c0c0'}}
          contentContainerStyle={{ flexGrow: 1,width:'100%',height:'100%' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
               }}>
                <WelcomeHome setModalVisible={setModalVisible} setLogget={props.setLogget}/>


                </Modal>
            <View style={{width:'100%',height:sizes, backgroundColor:'#ffffff', marginTop:5}}>
            <InphograpicsList infografias={Inphograpics_list}/>
    
            </View>
            <Pressable onPress={dimist} style={{width:'100%',height:16,alignContent:'center',alignItems:'center', backgroundColor:'#fff',marginBottom:5,}}>
            <Image
              style={{ width:15,
                height:15,
                alignItems:'center',
                resizeMode:'contain',}}
              source={require('../drawables/rayas.png')}/>
    
    
            </Pressable>
    
                 <WebView 
                 ref={(ref) => webViewRef.current = ref}
                 nestedScrollEnabled
                 onMessage={onMessage}
                 injectedJavaScript={injectJavaScript}
                 source={{ uri: url }}
                 javaScriptEnabled={true}
                 />
          
    
          </ScrollView>
     )

      }else{
        return(
          <ScrollView 
          style={{backgroundColor:'#c0c0c0'}}
          contentContainerStyle={{ flexGrow: 1,width:'100%',height:'100%' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            <View style={{width:'100%',height:sizes, backgroundColor:'#ffffff', marginTop:5}}>
            <InphograpicsList infografias={Inphograpics_list}/>
    
            </View>
            <Pressable onPress={dimist} style={{width:'100%',height:16,alignContent:'center',alignItems:'center', backgroundColor:'#fff',marginBottom:5,}}>
            <Image
              style={{ width:15,
                height:15,
                alignItems:'center',
                resizeMode:'contain',}}
              source={require('../drawables/rayas.png')}/>
    
    
            </Pressable>
            <View style={{backgroundColor:'#ffffff'}}>
              <Text>Estas en el modo offline; ya que este momento no cuentas con conexion a internet pero puedes seguir usan MexApp </Text>
            <Image
              style={{ width:'100%',
              
                alignItems:'center',
                resizeMode:'contain',}}
              source={require('../drawables/logo.png')}/>
            </View>
    
          
    
          </ScrollView>
     )


      }
   
 

};
export default HomeScreen;