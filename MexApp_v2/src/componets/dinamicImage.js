import React from "react";
import { Image, View,StyleSheet } from "react-native";

function DinamicImage (props){
    const bandera=props.banderadreams
    if(bandera==1){
        return( 
        <View>
        
          <Image  source={require('../drawables/sleeping_2.gif')}  style={style.image}/>
        </View>
        )
    }else{
        return(
        <View>
            <Image  source={require('../drawables/sonrix.gif')}  style={style.image}/>
        </View>)
                
    }

}

const style= StyleSheet.create({
    image:{
        width:140,
        height:140,
        borderRadius: 360,
     
    },




})

export default DinamicImage