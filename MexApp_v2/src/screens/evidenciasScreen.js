import React, { useEffect, useState }from 'react';
import { Text, View,StyleSheet,Image,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from 'react-native-webview';
import Api from '../api/intranet'
import EvidencaList from '../containers/evidenciasList'
import { useNavigation } from '@react-navigation/native';


function EvidenciasScreen (){
    const navigation = useNavigation();
    const [items, setItems] = useState([])
    useEffect(() => {
        getdataoffline()
        getevi()
       

   }, [])

   const getevi = async() =>{
       //const travel=await Api.getCurrentravel(id_operador)
       const evidencias = await Api.getevidencias(global.id_operador)
       setItems(evidencias)
   }

   const opencamera=()=>{
    navigation.navigate('camera')
}
function Base64(filePath){
    RNFetchBlob.fs
.readFile(filePath, 'base64')
.then((data) => {
    return data

})
.catch((err) => {
    return 'error'
});

}
   const getdataoffline= async()=> {
    const evidencias = await AsyncStorage.getItem('@evidence')

   
    if(evidencias != null){
        var convert=JSON.parse(evidencias)
        var string= Base64(convert.string64) 
        console.log(string)
    }

    try {
        
    } catch (error) {
        console.log(error)
        
    }

   }


  return(
      
    <View style={{width:'100%',height:'100%' }}>
        <EvidencaList items={items}/>
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



export default EvidenciasScreen;