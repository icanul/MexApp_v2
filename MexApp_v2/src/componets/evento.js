import { useRoute } from '@react-navigation/core';
import React from 'react';
import { View,Text,Button } from 'react-native';
import operations from '../utils/operations';



function Event (props){

    return(
        <View style={{flexDirection:'row'}}>
           
            <Text style={{width:'15%',margin:5,color:'#393d42'}}>{props.status}</Text>
         
            <Text style={{width:'40%',margin:5,color:'#393d42'}}>{operations.fechaFormateada(props.fecha_inicio)} </Text>
        
            <Text style={{width:'40%',margin:5,color:'#393d42'}}>{operations.fechaFormateada(props.fecha_fin)}</Text>
      
        </View>

    )

};
export default Event;