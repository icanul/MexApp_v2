import React, { useEffect, useState }from 'react';
import { Text, View,StyleSheet,Image,Pressable, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
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

    useEffect(() => {
        get_token()
   }, [])
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
    const sol=global.sol
    console.log(token)
    const url = 'https://tms.logsys.com.mx/shipments.incidents.api/shipment/'+ global.solicitud+'/incidents';
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`   
  }
};
  axios.get(url, config)
  .then(response => setItems(response.data.incidents))
  .catch(error => console.error('Error:', error));
   }

   const opencamera=()=>{
   setModalVisible(true)
}




  return(
      
    <View style={{width:'100%',height:'100%' }}>

        <IncidenciaList items={items}/>
        <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}>
            <Insert_insidencias token={token} setModalVisible={setModalVisible} types={types} get_token={get_token} />

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