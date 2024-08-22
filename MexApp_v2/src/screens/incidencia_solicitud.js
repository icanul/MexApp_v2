import React, { useEffect, useState }from 'react';
import { Text, View,StyleSheet,Image,Pressable, Modal, Alert} from 'react-native';
import StorageData from '../utils/storageData';
import NetInfo from "@react-native-community/netinfo";
import Api from '../api/intranet'
import tms from '../api/tms';
import EvidencaList from '../containers/evidenciasList'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Insert_insidencias from '../modals/insert_incidencia';
import IncidenciaList from '../containers/incidenciasList';



function Incidencia_solicitud (){
    const navigation = useNavigation();
    const [items, setItems] = useState([])
    const [items1, setItems1] = useState([])
    const [modalVisible,setModalVisible]=useState(false)
    const [token,setToken]=useState("")
    const [types,setTypes]=useState([])
    const [heightcustom,setHeightcustom]=useState('50%')
    const [heightcustom1,setHeightcustom1]=useState('50%')
    const [heightbandera,setHeightbandera]=useState(false)
    const [heightbandera1,setHeightbandera1]=useState(false)
    const [bandera,setBandera]=useState(false)
    const [banderaconection,setBanderaConection]=useState(false)


    useEffect(() => {
       
        const unsubscribe = NetInfo.addEventListener(state => {
            var stade_conection=state.isConnected
            var isInternetReachable=state.isInternetReachable
           
    
            if(stade_conection==true&&isInternetReachable==true){
                setBanderaConection(true);
            
              if(global.solicitud===0){
                setBandera(false)
            }else{
                get_token()
                setBandera(true)
            }
              getevi()
            //  getdataOnline()
    
            }
            else{
                setBanderaConection(false);
                getdataOffline()
             
            }
          });
  
          return () => {
            unsubscribe();
          };
    
   }, [])

   const getdataOffline=async()=>{
    Alert.alert('Sin conexión','En este momento no tienes conexión se mostraran los ultimos datos guardados')
    const incidents=await StorageData.consultData('@incidents')
    if(incidents!= null)
    {
      var convert=JSON.parse(incidents)
      console.log(convert)
      setItems(convert)
    }
   }
   const save_incidents=async(data)=>{
    const save = await StorageData.insertData('@incidents',data)
    console.log(save)

   }

   const getevi = async() =>{
    //const travel=await Api.getCurrentravel(id_operador)
    const evidencias = await Api.getevidencias(global.id_operador)
    if(evidencias.length <= 0){
       // setHeightcustom1('100%')
        
    }
     setItems1(evidencias)
}
   const get_token=async()=>{
    try {
        console.log('obteniendo token...')
        const resp=await tms.get_token_incidencias()
        var token=resp.token
        global.token_incidencias=token;
        setToken(token)
        get_incidencias_type(token)
        get_incidencias_sol(token)
        
    } catch (error) {
        console.log(error)
        
    }
   }

   const get_incidencias_type=(token)=>{
    console.log(token)
    const url = 'https://tms.logsys.com.mx/shipments.incidents.api/incident-types';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(response => setTypes(response.data))
    .catch(error => console.error('Error:', error));

    }

   const get_incidencias_sol=(token)=>{
    console.log('nbuscando -------'+bandera)
    
       
        const url = 'https://tms.logsys.com.mx/shipments.incidents.api/shipment/'+ global.solicitud+'/incidents';
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
          }
        };
          axios.get(url, config)
          .then(response => {
            var incidents=response.data.incidents
            save_incidents(incidents)
        
            if(incidents.length <= 0){
              //  setHeightcustom('50%')   
            }
            setItems(incidents)
        })
          .catch(error => console.error('Error:', error));

   }



   const opencamera=()=>{
    if(bandera===true){
        setModalVisible(true)

    }else{
        navigation.navigate('camera')
    }
}




  return(
      
    <View style={{width:'100%',height:'100%' }}>
         <View style={{width:'100%',height:heightcustom }}>
         <Text style={{color:'#000000',textAlign:'center',fontWeight:'bold'}}>Incidencias con solicitud</Text>
        <IncidenciaList items={items}/>
        </View>
        <View style={{width:'100%',height:heightcustom1 }}>
        <Text style={{color:'#000000',textAlign:'center',fontWeight:'bold'}}>Incidencias sin solicitud</Text>
        <EvidencaList items={items1}/>
        </View>
        <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}>
            <Insert_insidencias token={token} setModalVisible={setModalVisible}  types={types} get_token={get_token} />

        </Modal>
        <View style={style.horizontal} >
            <Pressable onPress={opencamera}>
                <Image style={{width:50,height:50,margin:10}} source={require('../drawables/camera.png')}/>
            </Pressable>
        </View>
    </View>
   )

};

const style = StyleSheet.create({
    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'blue',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:100,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      borderRadius:360,marginTop:10,elevation: 5
      

  },
  textbutton:{
        color:'#ffffff',
        textAlign: 'center'
    },
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',//use absolute position to show button on top of the map
    
     
        alignSelf: 'flex-end' ,
        top: '90%'//for align to right
       
     
  
    },
  
  })



export default Incidencia_solicitud;