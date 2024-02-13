import { useRoute } from '@react-navigation/core';
import React from 'react';
import { View,Text,Button } from 'react-native';


function Instrucction (props){

    return(
        <View style={{flexDirection:'row'}}>
           
            <Text style={{width:'5%',margin:5,color:'#393d42'}}></Text>
         
            <Text style={{width:'65%',margin:5,color:'#393d42'}}>{props.description} </Text>
        
            <Text style={{width:'20%',margin:5,color:'#393d42'}}>{props.type.alias} </Text>
      
        </View>

    )

};
export default Instrucction;