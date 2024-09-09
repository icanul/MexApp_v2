import React ,{ useState,useEffect }from "react";
import { View,Text,Pressable,TextInput ,Image, StyleSheet,PermissionsAndroid ,SafeAreaView,ScrollView, Alert} from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import StorageData from '../utils/storageData';
import NetInfo from "@react-native-community/netinfo";
import ModalStyle from '../styles/modalsstyle'
import Operations from "../utils/operations";
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
    const [banderaconection,setBanderaConection]=useState(false)


    useEffect(() => {
        var array=props.types
        cambiarLlave(array,'name','value')
        console.log(array)
        setTypes(array)
         
        const unsubscribe = NetInfo.addEventListener(state => {
            var stade_conection=state.isConnected
            var isInternetReachable=state.isInternetReachable
           
    
            if(stade_conection==true&&isInternetReachable==true){
                setBanderaConection(true);
    
            }
            else{
                setBanderaConection(false);
             
            }
          });
  
          return () => {
            unsubscribe();
          };
    
         
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

    const save_incidents=async(incidencia)=>{
        var itmes_saves=[]

        const incidents=await StorageData.consultData('@incidents_saves')
        if(incidents!= null){
          var convert=JSON.parse(incidents)
          itmes_saves.push(convert)
          itmes_saves.push(incidencia)
          const save = await StorageData.insertData('@incidents_saves',itmes_saves)
          console.log(save)
          Alert.alert('incidencia Guardada sin conexion ',save)
          close()
         
    
        }else{
            itmes_saves.push(incidencia)
            const save = await StorageData.insertData('@incidents_saves',itmes_saves)
            console.log(save)
            Alert.alert('MexApp','incidencia Guardada sin conexion '+save)
            close()

        }       
    
       }
    

    const close= () =>{
        props.get_token()
        props.setModalVisible(false)
    
    }
    const validate_c=()=>{


        if(banderaconection===true){
            send_Report()

        }
        else{
            setBanderaConection(false);
         
            const now = new Date();
            const utcDate = now.toISOString();
            
            var tipo_id=obtenerIdPorNombre(types,selected1)
             var imaegenes=[]

            var incident ={
                "incident":{
                    "incident_time":utcDate,
                    "shipment_Id":global.solicitud,
                    "type_Id":tipo_id,
                    "type":selected1,
                    "comment":text,
                    "vehicle_id":global.vehicle_id,
                    "driver_id":global.id_operador,
                    "vehicle_vehicle_id":null ,
                  
                }
            }
            if(images.length>0){
                for(var i=0;i<images.length;i++){
                    var image=images[i]
                
                    const data = {
                        uri:image.uri, 
                        type:"image/jpeg", 
                        name:'profile'+'.jpg', 
                        filename:'afiletest'
                    };
                    imaegenes.push(data)
                }


            }
            var data={
                incident:incident,
                imagenes:imaegenes
            }
            save_incidents(data) 

        }
              
        
        
    }


    const send_Report= async()=>{
        setLoad(true)


        const now = new Date();
        const utcDate = now.toISOString();
        
        var tipo_id=obtenerIdPorNombre(types,selected1)
        

        var incident ={
            "incident":{
                "shipment_Id":global.solicitud,
                "type_Id":tipo_id,
                "comment":text,
                "vehicle_id":global.vehicle_id,
                "driver_id":global.id_operador,
                "vehicle_vehicle_id":null ,
                "incident_time":utcDate
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
                        <Text style={ModalStyle.title}>Solicitud: </Text>
                    <    Text style={ModalStyle.texto}>{global.solicitud}</Text>
                    </View>
        
                    <View style={ModalStyle.horizontal}>
                        <Text style={ModalStyle.title}>Operador: </Text>
                    <    Text style={ModalStyle.texto}>{global.nombre}</Text>
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
                    <ScrollView horizontal={true} style={styles.scrollView}>
                    {images.map((image, index) => (
                        <View style={ModalStyle.horizontal}>
                     <Image
        source={{ uri: image.uri }}
        style={{width:90,height:180,resizeMode:'contain',margin:3}}/>
                 </View>
                
                ))}
                </ScrollView>
                   
                   
                    <View style={ModalStyle.horizontal}>
                    <Pressable 
                    onPress={close}
                    style={ModalStyle.button1}>
                        <Text style={ModalStyle.textbutton}>Cerrar</Text>
                    </Pressable>
                    <Pressable 
                    onPress={validate_c}
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
const styles = StyleSheet.create({
    scrollView: {
      flexDirection: 'row',
    },
    box: {
      width: 500,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      backgroundColor: '#f0f0f0',
    },
  });
  
export default Insert_insidencias;