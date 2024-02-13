import React ,{ useEffect, useState }from 'react';
import { View,Text,Image, PermissionsAndroid,Pressable,StyleSheet ,Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Styles from '../styles/styles'
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import SetEvidence from '../modals/setevidence';
import Api from'../api/tms'



function CametaScreen (props){
    const [image,setImage]= useState('')
    const navigation = useNavigation();
    const [modalVisible1, setModalVisible1] = useState(false);
    const [urlfile,seturl]= useState('')
    const [string64,setString64]= useState('')
    const [isload,serLoad]= useState(false);



    useEffect(() => {

        if (Platform.OS === 'android') {
            permissioncamera();
          } else {
           takephoto()
           console.log('permission ios')
          }

    }, [])
    async function createPDF(){
      serLoad(true)
      try {
        var id=props.route.params.id
        const setevidence = await Api.setevidencediesel(string64,id)
        console.log(setevidence)
        Alert.alert('Asignación Confirmada',"Se subio correctamente las evidencias")
        serLoad(false)
        props.navigation.goBack()
        
      } catch (error) {
        serLoad(false)
        Alert.alert("Error al enviar: " ,  error)
        console.log(error)
        
      }

    }

    const base64=(filePath)=>{
      RNFetchBlob.fs
.readFile(filePath, 'base64')
.then((data) => {
  setString64(data)
  console.log(data)

})
.catch((err) => {
  console.log(err)

});
    }

    const takephoto=()=>{
        const options={
            title: 'tomar foto',
            storageOption:{
                skipBackup: true,
                path:'images'
            },
            includeBase64:true
        }

      
            launchCamera(options, response=>{
                if(response.didCancel){
                    navigation.goBack()
                    console.log('cancelar')
                    

                }
                else if(response.errorCode){
                    console.log(response.errorMessage)

                }
                else if(response.assets){
                    const uri= response.assets[0].uri
                    setImage(uri)
                    base64(uri)
                    console.log(uri)

                }
            })
           
        



    }
    async function permissioncamera() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App External Storage Write Permission',
              message:
                'CameraExample App needs access to Storage data in your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              
            takephoto()
           console.log('permission android')
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          console.log(err);
        }
      }
      if(isload==true){

        return(
            <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
            
        </View>

        )
    }else{
    return(
        <View style={{flex:1,width:'100%',height:'100%' }}>
            <Image
            style={{  width:'100%',height: '100%',resizeMode:'contain',alignSelf:'center'}}
            source={{ uri: image}}
            />
               <View style={style.horizontal} >
            <Pressable 
            onPress={takephoto}
            style={style.button}>
                <Text style={style.textbutton}>Reintentar</Text>
            </Pressable>
            <Pressable 
            onPress={createPDF}
            style={style.button1}>
                <Text style={style.textbutton}>Enviar</Text>
            </Pressable>
            </View>
            
        </View>

    )
 
}}

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
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
  content:{
       
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor:'#eaeaeacc',
 

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
    
     
        alignSelf: 'center' ,
        top: '85%'//for align to right
       
     
  
    },
  
  })
export default CametaScreen;