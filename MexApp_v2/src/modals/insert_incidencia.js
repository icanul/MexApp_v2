import React ,{ useState,useEffect }from "react";
import { View,Text,Pressable,TextInput ,Image, Alert,PermissionsAndroid} from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storageData from '../utils/storageData';
import ModalStyle from '../styles/modalsstyle'
import TMS from '../api/tms'
import Reload from "./reload";

function Insert_insidencias(props){
    const [images, setImages] = useState([]);
    const [names,setNames]=useState('No hay imagenes agregadas')
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [selected1, setSelected1] = useState("");
    const [types,setTypes]=useState([])
    const [load,setLoad]=useState(false)

    useEffect(() => {
        var array=props.types
        cambiarLlave(array,'name','value')
        console.log(array)
        setTypes(array)
         
      }, [])
    function cambiarLlave(array, llaveAntigua, llaveNueva) {
        array.forEach(obj => {
            if (obj.hasOwnProperty(llaveAntigua)) {
                obj[llaveNueva] = obj[llaveAntigua];
                delete obj[llaveAntigua];
            }
        });
    }

   
    function obtenerIdPorNombre(array, nombre) {
        let objeto = array.find(obj => obj.value === nombre);
        return objeto ? objeto.id : null;
    }
    

    const close= () =>{
        props.get_token()
        props.setModalVisible(false)
    
    }
    const send_Report= async()=>{
        setLoad(true)


        let fechaActual = new Date();
        let year = fechaActual.getUTCFullYear();
        let month = (fechaActual.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses de 0-11, agregar 1
        let day = fechaActual.getUTCDate().toString().padStart(2, '0');
        let hours = fechaActual.getUTCHours().toString().padStart(2, '0');
        let minutes = fechaActual.getUTCMinutes().toString().padStart(2, '0');
        let seconds = fechaActual.getUTCSeconds().toString().padStart(2, '0');
        let fechaHoraUTC = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        
        var tipo_id=obtenerIdPorNombre(types,selected1)

        var incident ={
            "incident":{
                "shipment_Id":global.solicitud,
                "type_Id":tipo_id,
                "comment":text,
                "vehicle_id":global.vehicle_id,
                "driver_id":global.id_operador,
                "vehicle_vehicle_id":null ,
                "incident_time":fechaHoraUTC
            }
          
        }
        var id =''
        try {

            var response = await TMS.insert_incidents(props.token,incident)
            id = response.id
            console.log( 'se subio: ' +id)

            
        } catch (error) {
            setLoad(false)
            console.log(error)
            close()
            
        }
      
       if(images.length>0){

        for(var i=0;i<images.length;i++){
            var image=images[i]
            const formData = new FormData()
            const data = {uri:image.uri, type:"image/jpeg", name:'profile'+'.jpg', filename:'afiletest'};
            formData.append("", data);
            try {
                const set_evi= await TMS.insert_evidencias_incidents(props.token,formData,id)
                console.log(set_evi)
                var response= await set_evi.json();
                console.log(response)
                setLoad(false)
               
                
              } catch (error) {
                console.log(error)
                setLoad(false)   
              }
        }
        close()
      
         

       }
       else{
        setLoad(false)
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

            permissioncamera()
        
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
          
                    setImages([...images, ...response.assets]);


                         
                }
            })
    }
    if(load==false){
        return(
            <View  style={ModalStyle.content}>
                <View style={ModalStyle.modal}>
                <Text style={ModalStyle.title}></Text>
        
                    <Text style={ModalStyle.title}>Generar Incidencia</Text>
                    <Text style={ModalStyle.title}></Text>
        
                    <View style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>Operador: </Text>
                    <    Text style={ModalStyle.texto}>{global.nombre}:</Text>
                    </View>
                    <View style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>Unidad: </Text>
                    <    Text style={ModalStyle.texto}>{global.alias}</Text>
                    </View>
        
                   
                    <SelectList 
                        style={{color:'#000000',width:260}}
                        setSelected={setSelected1}
                        data={types}
                        dropdownTextStyles	={{color:'#000000'} }
                        inputStyles={{color:'#000000'} }
                         label="Incidencias"
                         searchPlaceholder='Seleciona una opcion'
                         placeholder='Tipo de Incidencia '
        
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
                    <Pressable
                    onPress={validate} 
                    style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>Agregar imagen </Text>
                        <Image
                         style={ModalStyle.icon}
                         source={require('../drawables/attach.png')}
                          />
                    </Pressable>
                    <View style={{margin:15}}>
                    {images.map((image, index) => (
                        <View style={ModalStyle.horizontal}>
                            <Text style={ModalStyle.title}>{index+1} </Text>
        
                 <Text style={ModalStyle.texto}>{image.fileName} </Text>
                 </View>
                
                ))}
                </View>
                   
                   
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
    else{
        return(
            <View style={ModalStyle.content}>
                <Reload/>
            </View>
        )
        
    }

   


}
export default Insert_insidencias;