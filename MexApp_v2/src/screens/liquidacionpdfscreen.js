import React, {useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View,Image,Text ,PermissionsAndroid,StyleSheet,Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'


function LiquidacionPdf (props){
    const id=props.route.params.id
    const navigator=useNavigation()

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
          } else {
            downloadFile()
            console.log('permission ios')
          }
  }, [])

  async function requestExternalWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'CameraExample App External Storage Write Permission',
          message:
            'CameraExample App needs access to Storage data in your SD Card ',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile()
       console.log('permission android')
      } else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      alert('Write permission err'+ err);
      gnavigation.goBack()
      console.warn(err);
    }
  }

    const downloadFile = async () => {
      const token =global.liqtoken
      const { config, fs } = RNFetchBlob;
  const downloadsDir = fs.dirs.DownloadDir;
  const url = 'https://tms.logsys.com.mx/liquidations.api/api/liquidations/'+id+'/print'; // Reemplaza con la URL del archivo a descargar
  const fileName = id +'.pdf'; // Reemplaza con el nombre que deseas para el archivo
  const filePath = `${downloadsDir}/${fileName}`;

  try {
    const response = await RNFetchBlob.config({
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: 'Descargando liquidacion '+id,
            mime: 'application/pdf',
            path: filePath,
            mediaScannable: true,
          },
    }).fetch('GET',url,{  'Authorization ': ' Bearer '+token, });

      Alert.alert("",`Archivo descargado con éxito en ${filePath}`)
      console.log(`Archivo descargado con éxito en ${filePath}`);
      navigator.goBack()
  
  } catch (error) {
    console.error('Error al descargar el archivo:'+ error);
    navigator.goBack()

  }
     
      };
   

      return(
        <View style={style.content}>
            <Text style={style.title}>DESCARGANDO ARCHIVO</Text>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
            
        </View>
      )


}
const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

    },
    checkbox:{
        flexDirection:'row',
  
    },
    check_s:{
        marginTop:10,

    },
    image:{
        width:200,
        height:200,
    },

    modal:{
      width:300,
      height:200,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5


    },
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
     
   

  },

    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
    textbutton:{
        textAlign: 'center',
        color: '#ffffff',
     
        

    },
    title:{
      
        textAlign: 'center',
        fontSize:16,
        fontWeight: "bold",
        color:'#000000',

       
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },

})
export default LiquidacionPdf

