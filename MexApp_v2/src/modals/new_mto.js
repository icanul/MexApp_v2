import React ,{ useState,useEffect }from "react";
import { View,Text,Pressable,TextInput ,Image, Alert,PermissionsAndroid, TouchableOpacity} from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storageData from '../utils/storageData';
import moment from 'moment/moment';
import ModalStyle from '../styles/modalsstyle'
import Geolocation from 'react-native-geolocation-service';
import TMS from '../api/tms'
import { UrlTile } from "react-native-maps";

var arraynames=[]
var arrayurls=[]


function Maintenance(props){
    const [milatitusd,setMilatitud]=useState(0.0)
    const [milongitud,setMilongitud]=useState(0.0)
    const [names,setNames]=useState()
    const [isload,setisload]=useState(false)
    const [urls,setUrl]=useState('https://media.istockphoto.com/id/1369813814/es/vector/fondo-de-transparencia-de-mosaico-a-cuadros-underlay-para-mostrar-elementos-gr%C3%A1ficos-y.jpg?s=1024x1024&w=is&k=20&c=3ldZFjOoh4aNqpZ_cqvSz9hOxJT3acit4ZF_K4TLJAc=')
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [selected, setSelected] = useState("");
    const [selected1, setSelected1] = useState("");

    useEffect(() => {
        geolocation()
        console.log(global.token)
         
      }, [])
    const typedefault=[]
    const types=[
        {key:'1', value:'UNIDAD MOTRIZ'},
        {key:'2', value:'UNIDAD DE ARRASTRE'},

    ]
    const datatext = [
      {key:'1', value:'CABINA E INTERIORES'},
      {key:'2', value:'CHASIS Y SUSPENSION'},
      {key:'3', value:'GENERAL, HERRAMIENTAS ESPECIALES'},
      {key:'4', value:'MICELANEOS'},
      {key:'5', value:'MOTOR'},
      {key:'6', value:'SERVICIOS Y MANTENIMIENTO'},
      {key:'7', value:'SISTEMA DE AIRE Y FRENOS'},
      {key:'9', value:'SISTEMA ELECTRICO E INSTRUMENTOS'},
      {key:'10', value:'TREN MOTRIZ'},
  ]
   
 

   // const [data,setData]=useState([])

  


    const close= () =>{
        setisload(false)
        props.setHelpmodal1(false)
        props.onRefresh()
    }
    const geolocation=()=>{
        console.log("actualizando localozacion")
            Geolocation.getCurrentPosition(
                (position) => {
                  var Region ={
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                  }
               
                  setMilatitud(position.coords.latitude)
                  setMilongitud(position.coords.longitude)
        
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    const send_Report= async()=>{
        geolocation()
     
        let d= datatext.filter(d=> d.value==selected)
        let report_type_id=d[0].key
        var time=moment().format('YYYY-MM-DDTHH:MM')
        var time2=time+':00.000'
        const formData = new FormData()
        formData.append('report_type_id',report_type_id)
        console.log(selected1)
        if(selected1=='UNIDAD MOTRIZ'||selected1==1){
            formData.append('vehicle_id',global.vehicle_id)
        }else{
            formData.append('vehicle_id',global.id_remolque)

        }
        formData.append('driver_id',global.id_operador)
        formData.append('observation',text)
        formData.append('shipment_id',global.solicitud)
        formData.append('lon',milongitud)
        formData.append('lat',milatitusd)
        formData.append('time',time2)


       /*/ if(arrayurls.length>0){
            console.log(arrayurls)
            
            for (var i = 0; i < arrayurls.length; i++) {
                var imagen=arrayurls[i]
                const data = {uri:imagen, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
                formData.append('', data)
               
             }        

        }/*/
        var imagen=urls
        if(imagen=='https://media.istockphoto.com/id/1369813814/es/vector/fondo-de-transparencia-de-mosaico-a-cuadros-underlay-para-mostrar-elementos-gr%C3%A1ficos-y.jpg?s=1024x1024&w=is&k=20&c=3ldZFjOoh4aNqpZ_cqvSz9hOxJT3acit4ZF_K4TLJAc='){


        }else{
            const data = {uri:imagen, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
            formData.append('', data)

        }
       
        console.log(formData)
        try {
            setisload(true)
           const setNotifications= await TMS.setreportM(formData,token)
           var res_status=setNotifications.status 
           close()
           console.log(res_status)
            
        } catch (error) {
            Alert.alert(error)
            close()
            
        }
       
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
         //  console.log('permission android')
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          console.log(err);
        }
      }

    
    const validate=()=>{
        
        if(urls.length<=3){
            permissioncamera()

        }else{
            Alert('Solo se permiten 5 imagenes')
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

      
            launchCamera(options, async response=>{
                setCount(count + 1);
                if(response.didCancel){
                   
                    console.log('cancelar')
                    

                }
                else if(response.errorCode){
                    console.log(response.errorMessage)

                }
                else if(response.assets){
                    var name=response.assets[0].fileName
                    var url=response.assets[0].uri
                    console.log(url)
                    
                    setUrl(url)
              

                    // Imprimir el resultado
                
                }
            })
    }
    if(isload){
        return(
            <View style={ModalStyle.content}>
            <Image  style={ModalStyle.image} source={require('../drawables/loading.gif')}/>
            
        </View>
        )

    }else{
        return(
            <View  style={ModalStyle.content}>
                <View style={ModalStyle.modal}>
                <Text style={ModalStyle.title}></Text>
        
                    <Text style={ModalStyle.title}>Nuevo reporte MTO</Text>
                    <Text style={ModalStyle.title}></Text>
        
                    <View style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>Operador: </Text>
                    </View>
                    < Text style={ModalStyle.texto}>{global.nombre}:</Text>
        
                    <View style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>Unidad: </Text>
                    <    Text style={ModalStyle.texto}>{global.alias}</Text>
                    </View>
                    <View style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>U. de arrastre: </Text>
                    <    Text style={ModalStyle.texto}>{global.vehicle_carga}</Text>
                    </View>
                    <Text style={ModalStyle.title}></Text>
                    <Text style={ModalStyle.title}>Reportar por </Text>
        
                    <SelectList 
                        style={{color:'#000000',width:260}}
                        setSelected={setSelected1}
                        data={types}
                       // defaultOption={{key:'1', value:'UNIDAD MOTRIZ'}}
                        dropdownTextStyles	={{color:'#000000'} }
                        inputStyles={{color:'#000000'} }
                        save="value"/>
        
                    <Text style={ModalStyle.title}>Tipo de  Falla</Text>
                   
                        <SelectList 
                        style={{color:'#000000',width:260}}
                        setSelected={setSelected}
                        data={datatext}
                        dropdownTextStyles	={{color:'#000000'} }
                        inputStyles={{color:'#000000'} }
                        save="value"/>
                         <TextInput
                        disabled={true}
                        style={ModalStyle.input}
                        label="text"
                        value={text}
                        multiline={true}
                        placeholder="Comentario"
                        onChangeText={text => setText(text)}
                        />
                    <TouchableOpacity
                    onPress={permissioncamera} 
                    style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>TOMAR FOTO </Text>
        
                        <Image
                         style={ModalStyle.icon}
                         source={require('../drawables/camera.png')}
                          />
        
                    </TouchableOpacity>
                    <Image
                    style={{  width:80,height: 140,resizeMode:'contain',alignSelf:'center'}}
                    source={{ uri: urls}}
                    />
                   
                    <View style={ModalStyle.horizontal}>
                    <TouchableOpacity 
                    onPress={close}
                    style={ModalStyle.button1}>
                        <Text style={ModalStyle.textbutton}>Cerrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={send_Report}
                    style={ModalStyle.button}>
                        <Text style={ModalStyle.textbutton}>Enviar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
             
            );

    }

   


}
export default Maintenance;