import React ,{ useState }from "react";
import { View,Text,Pressable,TextInput ,Image, Alert,PermissionsAndroid,StyleSheet} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storageData from '../utils/storageData';
import ModalStyle from '../styles/modalsstyle'
import TMS from '../api/tms'
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';


var images=[]
var arraynames=[]
var arrayurls=[]
function TmsReports(props){
    const [urls,setUrl]=useState()
    const [names,setNames]=useState('No hay imagenes agregadas')
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [isload,setLoad]=useState(false)
    const [sendR,setSendr]=useState(false)

    const close= () =>{
        console.log('el cheket debe ser: '+sendR)
        if(sendR){
            switch (props.id_causa) {
                case 3:
                    props.setIsChecked1(true)
                case 2:
                  props.setIsChecked2(true)
                case 10:
                    props.setIsChecked3(true)
                case 18:
                    props.setIsChecked4(true)
                case 17:
                    props.setIsChecked5(true)
                default:
                  console.log('no hay mas options')
              }

        }else{
             switch (props.id_causa) {
            case 3:
                props.setIsChecked1(false)
            case 2:
              props.setIsChecked2(false)
            case 10:
                props.setIsChecked3(false)
            case 18:
                props.setIsChecked4(false)
            case 17:
                props.setIsChecked5(false)
            default:
              console.log('no hay mas options')
          }

        }

       
        images=[]
        arrayurls=[]
        arraynames=[]
        setLoad(false)
       props.setModalVisible(false)

       
    }
    const send_Report= async()=>{
     
        const formData = new FormData()     
        formData.append('notification_type_id',props.id_notification)
        formData.append('vehicle_id',global.vehicle_id)
        formData.append('driver_id',global.id_operador)
        formData.append('comment',text)
        //formData.append(shipment_id,solicitud)
        formData.append('shipment_id',props.solicitud)
        if(arrayurls.length>0){
            console.log('agregando imagenes')
            console.log(arrayurls.length)
            for (var i = 0; i < arrayurls.length; i++) {
                var imagen=arrayurls[0]
                const data = {uri:imagen, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
                formData.append('', data)       
             }        
        }
        try {
            if(props.isConnected){
                setLoad(true)
                const setNotifications= await TMS.setLogisticsNotifications(formData)
                var res_status=setNotifications.status
                if(res_status==200||res_status==202){
                    console.log('se envio correctamente la peticion ')
                    setSendr(true) 
                }
                console.log(res_status)
                reporterERP()

            }else{
                Alert.alert
                (
                  'MexApp',
                  'NO hay conexión desea guardar su reporte',
                  [
                    {
                      text: 'si',
                      onPress: () => { 
                        saveFormDataToStorage(formData)  
                    
                      },
                    },
                   
                    {
                      text: 'Cancelar',
                      onPress:()=>{
                        close()
                      }
                    },
                  ]       
                )
            }
                  
        } catch (error) {
            Alert.alert(error)
            close()
            
        }
       
    }
    const saveFormDataToStorage = async (formData) => {
        try {
            const formDataJSON = JSON.stringify(formData);
            await AsyncStorage.setItem('tmsnotification', formDataJSON);
            Alert.alert('Reporte guardado correctamente');
            close()
            
        } catch (error) {
            Alert.alert(error);

            
        }
       
    }

    async function reporterERP(){

        try {
            console.log('enviando reporte a erp...')
            const reporter=await Api.setReport(props.solicitud,props.id_causa,text)
            console.log(reporter)
           close()
        } catch (error) {
            console.log(error)
            close()
            
        }
    }


    async function permissioncamera() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'MexApp External Storage Write Permission',
              message:
                'MexApp needs access to Storage data in your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              
            takephoto()
         //  console.log('permission android')
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          console.log(err);
        }
      }
 
    const validate=()=>{
        //63 64 66
        console.log('hay '+arraynames.length+' imagenes')
        console.log(props.id_causa,' '+props.id_notification)
        if(props.id_notification==63||props.id_notification==67||props.id_notification==66){
            Alert.alert('no es necesario enviar fotografia')


        }else{
            if(arraynames.length<=5){
                permissioncamera()
            }else{
                Alert.alert('Solo pueden enviarse 5 imagenes')
            }
        }
    
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
                setCount(count + 1);
                if(response.didCancel){
                    console.log('cancelar')         
                }
                else if(response.errorCode){
                    console.log(response.errorMessage)

                }
                else if(response.assets){
                  
                    const uri= response.assets[0].uri  
                    const name=response.assets[0].fileName
                    const id = response.assets[0].id
                  
                    var jsonimage={
                        id:count,
                        url:uri,
                        name:name
                    }
                    images.push(jsonimage)
                    arraynames.push(name)
                    arrayurls.push(uri)                
                    setUrl(images)
                    var cadenaConSaltos = arraynames.join('\n');
                    setNames(cadenaConSaltos)
                    // Imprimir el resultado
                    console.log(arrayurls);                
                }
            })
    }
    if(isload){
        return(
        <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>    
        </View>
        )

    }else{
        return(
            <View  style={ModalStyle.content}>
            <View style={ModalStyle.modal}>
    
                <Text style={ModalStyle.title}>Reporte</Text>
                <Pressable
                onPress={validate} 
                style={ModalStyle.horizontal}>
                    <Text style={ModalStyle.title}>Agregar imagen </Text>
                    <Image
                     style={ModalStyle.icon}
                     source={require('../drawables/attach.png')}
                      />
    
    
                </Pressable>
                <Text style={ModalStyle.texto}>{names} </Text>
                <TextInput
                    disabled={true}
                    style={ModalStyle.input}
                    label="text"
                    multiline={true}
                    value={text}
                    placeholder="Comentario"
                    onChangeText={text => setText(text)}
                    />
                <View style={ModalStyle.horizontal}>
                <Pressable 
                onPress={close}
                style={ModalStyle.button1}>
                    <Text style={ModalStyle.textbutton}>Cerrar</Text>
                </Pressable>
                <Pressable 
                onPress={send_Report}
                style={ModalStyle.button}>
                    <Text style={ModalStyle.textbutton}>Enviar</Text>
                </Pressable>
           
                </View>
    
            </View>
    
        </View>
         
        );
        

    }
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


export default TmsReports;