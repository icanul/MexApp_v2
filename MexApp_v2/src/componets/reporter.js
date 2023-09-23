import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Modal} from "react-native";
import Styles from '../styles/styles'
import Ot_validationModal from '../modals/ot_validationModal'
import { useNavigation } from '@react-navigation/native';



function Reporter(props){
  const navigation = useNavigation();
  const[isModalvisible, setModalVisible]=useState(false)

  const openmodal=()=>{
    if(props.status_id==3){
      setModalVisible(true)


    }
  }


    const local=(fecha)=> {
        if (fecha==null){
          return ''
    
        }else{
          try {
            var date= new Date(fecha)
            var year=date.getFullYear()
            var month=date.getMonth()+1
            var day=date.getDate()
            var  hora=date.getHours()
            var minute=date.getMinutes()
            var f= day+'-'+month+'-'+year+' '+hora+':'+minute
     
            return f
         
            
          } catch (error) {
            console.log(error)
            return ''
            
          }
    
        }
    
       }
       const opendetail=()=>{
        navigation.navigate('reporterdetail',{ id:props.id})

       }

    return(
        <TouchableOpacity style={Styles.contencard} onPress={openmodal}>
           <Modal
                animationType="slide"
                transparent={true}
                visible={isModalvisible}>
                <Ot_validationModal data={props} setModalVisible={setModalVisible}/>
            </Modal>
             <Text style={{textAlign:'right',marginTop:10}}>{props.status} </Text>
            <View  style={Styles.horizontal}>
                <Text style={Styles.titletext}>FOLIO: {props.id}</Text>
                <Text style={Styles.titletext}>Creado el: </Text>
                <Text style={Styles.simpletext}>{local(props.created_on)} </Text>
            </View>
            <View  style={Styles.horizontal}>
            <Text style={Styles.titletext}>Solicitud:</Text>
            <Text style={Styles.simpletext}>{props.number}:</Text>
            <Text style={Styles.titletext}>Unidad:</Text>
            <Text style={Styles.simpletext}>{props.vehicle}:</Text>


            </View>
            <View  style={Styles.horizontal}>
            <Text style={Styles.titletext}>Tipo de falla:</Text>
            <Text style={Styles.simpletext}>{props.report_type}:</Text>
            </View>
            <View  style={Styles.horizontal}>
            <Text style={Styles.titletext}>orden de trabajo:</Text>
            <Text style={Styles.simpletext}>{props.ot}:</Text>
            </View>
            <TouchableOpacity onPress={opendetail}  style={Styles.horizontal}>
            <Text style={Styles.titletext}>Observaciones</Text>
            <Text style={Styles.simpletext}>{props.last_observation}:</Text>
            </TouchableOpacity>
            
            
          
           
        </TouchableOpacity>
    )



}

export default Reporter;
