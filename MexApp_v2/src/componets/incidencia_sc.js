import React, { useState } from 'react';
import { View,Image,Text, TouchableOpacity,Modal } from 'react-native';
import Styles from '../styles/styles'
import Evidence_ins_modal from '../modals/evidence_inc_modal';



function Incidencia (props){
  const [modalVisible,setModalVisible]=useState(false)
  console.log(props.incident.incident.shipment_Id)


    const open=()=>{
      setModalVisible(true)
  }

  

    return(
        
        <View style={Styles.contencard} >
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>

            <Evidence_ins_modal setModalVisible={setModalVisible} id={props.id} />

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
            <Text style={Styles.simpletext}>{props.type}</Text>
          </View>
          <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Solicitud</Text>
            <Text style={Styles.simpletext}>{props.incident.incident.shipment_Id}</Text>
            <Text style={Styles.titletext}>Unidad</Text>
            <Text style={Styles.simpletext}>{props.incident.incident.shipment_Id}</Text>
          </View>
          <View style={Styles.horizontal}>
            <Text style={[Styles.titletext,{width:'23%'}] }>Comentario</Text>
            <Text  style={[Styles.simpletext,{width:'77%'}]}>{props.incident.incident.comment}</Text>
          </View>
          <TouchableOpacity onPress={open} style={Styles.horizontal}>
            <Text style={[Styles.titletext,{color:'blue'}] }>Ver imagenes</Text>
            <Image style={ Styles.minilogo} source={require('../drawables/attach.png')}/>
          
          </TouchableOpacity>
        
        </View>

    )

};
export default Incidencia;