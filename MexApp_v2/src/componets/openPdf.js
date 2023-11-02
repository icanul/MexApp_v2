import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,

} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { useNavigation } from '@react-navigation/native';

function OpenPdf(props) {
  const navigation = useNavigation();
  const BASE_API = 'tms.logsys.com.mx';
    useEffect(() => {     
      
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
     createPdf()
     console.log('permission ios')
    }
      });
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
            createPdf()
           console.log('permission android')
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Write permission err', err);
          gnavigation.goBack()
          console.warn(err);
        }
      }
     

    const createPdf=()=>{
          var id_CP=props.route.params.sol

          let dirs = RNFetchBlob.fs.dirs
          RNFetchBlob
          .config({
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              title: 'Descargando carta porte',
              mime: 'application/pdf',
              path : dirs.DownloadDir + '/'+id_CP+'.pdf',
              mediaScannable: true,
            },
            
          })
          .fetch('GET', 'https://'+BASE_API+'/tms/api/v2.0/cartaporte/'+id_CP+'/app', {
            Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
            // more headers  ..
          })
         
         .then((res)=>{    
          let status = res.info().status;    
          console.log('conexion:'+status)
           
        
         if (Platform.OS === 'android') {
           console.log(res.path())
      
         //.android.actionViewIntent(res.path(),'application/pdf');

        }
        else{
          RNFetchBlob.ios.openDocument(res.path());
          console.log(res.path())
        }     
            
         })
         .catch((errorMessage, statusCode) => {
           console.log(errorMessage)
           console.log(statusCode)
           navigation.goBack()
                    
        })
        .finally(()=>{

          navigation.goBack()
         
        })

      }
  return (
    <View style={styles.conten}>
        <View style={styles.textcontent}>
            <Image style={styles.logo}
            source={require('../drawables/loading.gif')}/> 
            <Text style={styles.textos}>Espere un momento</Text>
        </View>
 
    </View>
  )
}

const styles = StyleSheet.create({
  conten: {
   
    width: '100%',
    height: '100%'
  },
  textcontent:{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' },
   textos:{
   
    fontSize:17,
    fontWeight:'bold',
   }  ,
   logo:{
        
    width: 100,
    height:100
  
    
}, 

})

export default OpenPdf