import React ,{ useEffect, useState }from 'react';
import { View,Text,Button,Image, PermissionsAndroid,Pressable,StyleSheet ,Modal} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Styles from '../styles/styles'
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import SetEvidence from '../modals/setevidence';




function CametaScreen ({props}){
    const [image,setImage]= useState('https://cdn.pixabay.com/photo/2021/03/23/05/16/camera-6116360_960_720.png')
    const navigation = useNavigation();
    const [modalVisible1, setModalVisible1] = useState(false);
    const [urlfile,seturl]= useState('')


    useEffect(() => {

        if (Platform.OS === 'android') {
            permissioncamera();
          } else {
           takephoto()
           console.log('permission ios')
          }
   
       
    }, [])
    async function createPDF(){
        const fecha = new Date();
        var dt=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+''+fecha.getHours()+':'+fecha.getMinutes()
        let options = {
            html: '<div><img  src="'+image+'"  width="100%" > </div>',
            fileName: 'evidence'+dt,
            directory: 'Documents',
          };
      
          let file = await RNHTMLtoPDF.convert(options)
          seturl(file.filePath)
          setModalVisible1(true)


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
     

     

   
    return(
        <View style={{flex:1,width:'100%',height:'100%' }}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible(!modalVisible1);
        }}>

          <SetEvidence 
          modalVisible1={modalVisible1} 
          url={urlfile}
          navigation={navigation}
          setModalVisible1={setModalVisible1} 
       />


      </Modal>
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
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

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