import React,{useState,useEffect} from 'react';
import { View,Text,Image,Pressable, TouchableOpacity } from 'react-native';
import ModalStyle from '../styles/modalsstyle'
import { Button } from 'react-native-share';

function OpenNotificaton(props){
    const context=props.messageData
    console.log('si estoy abierto aun q no me veas')
    console.log(props.messageData)
    const confirmar=()=>{
        console.log(props)
        props.setModalVisible(false)
    }

    return(
    <View  style={ModalStyle.content}> 
        <View style={ModalStyle.modal_noty}>
        <Button
        title="Confirmar"
        color="#000000" 
        onPress={confirmar}
      />
            
            
            <Text style={ModalStyle.title}>{context.title} </Text>
            <Text  style={ModalStyle.title}>{context.body} </Text>
            <Image
        source={{ uri: context.image}}
        style={ModalStyle.image_noty}/>
          <TouchableOpacity onPress={confirmar} style={ModalStyle.button} >
    <Text style={ModalStyle.textbutton}>
        Confirmar
    </Text>

  </TouchableOpacity>
       
  
  </View>

 
    </View>

    )


}
export default OpenNotificaton;


