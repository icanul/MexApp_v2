import React, { useState } from 'react';
import { View,Image,Text, TouchableOpacity,Modal, Alert } from 'react-native';
import StorageData from '../utils/storageData';
import TMS from '../api/tms';
import Styles from '../styles/styles'
import ModalStyle from '../styles/modalsstyle'
import Evidence_ins_modal from '../modals/evidence_inc_modal_sc';



function Incidencia (props){
  const [modalVisible,setModalVisible]=useState(false)
  console.log(props.imagenes)


    const open=()=>{
      setModalVisible(true)
  }
  const send=async()=>{
    var id=''

    const incidents=await StorageData.consultData('@incidents_saves')
    if(incidents!= null){
      var convert=JSON.parse(incidents)
      const objetoEncontrado = convert.find(objeto => objeto.incident.incident.incident_time === props.incident.incident.incident_time);
      var imaegenes=objetoEncontrado.imagenes
      var incident_=objetoEncontrado.incident.incident
      var incident ={
        "incident":{
            "shipment_Id":global.solicitud,
            "type_Id":incident_.type_Id,
            "comment":incident_.comment,
            "vehicle_id":global.vehicle_id,
            "driver_id":global.id_operador,
            "vehicle_vehicle_id":null ,
            "incident_time":incident_.incident_time
        } 
      }
      console.log(incident)

      try {
        console.log('enviando sin conexion')
        var response = await TMS.insert_incidents( global.token_incidencias,incident)
        id = response.id
        console.log( 'se subio: ' +id, ' guardada sin conexion')
        
      } catch (error) {
        console.log(error)
        
        
      }
      if(imaegenes.length>0){
        for(var i=0;i<imaegenes.length;i++){
          var image=imaegenes[i]
          const formData = new FormData()
          const data = {uri:image.uri, type:"image/jpeg", name:'profile'+'.jpg', filename:'afiletest'};
          formData.append("", data);
          try {
              const set_evi= await TMS.insert_evidencias_incidents(global.token_incidencias,formData,id)
              console.log(set_evi)
              var response= await set_evi.json();
              console.log(response)             
              
            } catch (error) {
              console.log(error)
            }
      }

      }else{
        Alert.Alert('Dosumento sin conexion','se subio correctamente')
      }
        

    }

  }

  

    return(
        
        <View style={Styles.contencard} >
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>

            <Evidence_ins_modal setModalVisible={setModalVisible} images={props.imagenes} />

          </Modal>
          <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Estatus</Text>
            <Text style={Styles.simpletext}>Sin Enviar</Text>
          </View>
          <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Creado por</Text>
            <Text style={Styles.simpletext}>MEXAPP</Text>
            <Text style={Styles.simpletext}>({props.incident.incident.incident_time})</Text>
          </View>
          <View style={Styles.horizontal}>

            <Text style={Styles.titletext}>Tipo</Text>
            <Text style={Styles.simpletext}>{props.incident.incident.type}</Text>
          </View>
          <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Solicitud</Text>
            <Text style={Styles.simpletext}>{props.incident.incident.shipment_Id}</Text>
            <Text style={Styles.titletext}>Unidad</Text>
            <Text style={Styles.simpletext}>{global.alias} </Text>
          </View>
          <View style={Styles.horizontal}>
            <Text style={[Styles.titletext,{width:'23%'}] }>Comentario</Text>
            <Text  style={[Styles.simpletext,{width:'77%'}]}>{props.incident.incident.comment}</Text>
          </View>
          <TouchableOpacity onPress={open} style={Styles.horizontal}>
            <Text style={[Styles.titletext,{color:'blue'}] }>Ver imagenes</Text>
            <Image style={ Styles.minilogo} source={require('../drawables/attach.png')}/>
          
          </TouchableOpacity>
           
          <View style={ModalStyle.horizontal}>
    
                
                    <TouchableOpacity 
                    onPress={send}
                    style={ModalStyle.button}>
                        <Text style={ModalStyle.textbutton}>Reenviar</Text>
                        
                    </TouchableOpacity>
                    </View>
        
        </View>

    )

};
export default Incidencia;