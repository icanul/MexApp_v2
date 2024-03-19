import React from "react";
import { View,Text, TouchableOpacity,Image } from "react-native";
import Styles from '../styles/styles'
import operations from "../utils/operations";
import { useNavigation } from "@react-navigation/native";

function Reparto(props){
    const navigation = useNavigation();

    const map=()=>{
        navigation.navigate('repartosmap',{latitude:props.latitude,longitude:props.longitude,name:props.name,direction:props.direction})
      }


    return(
        <TouchableOpacity onPress={map} style={Styles.contencard}>

        <View style={Styles.horizontal}>
            <Text style={[Styles.titletext,{width:'60%'}]}>{props.name} </Text>
            <Text style={Styles.titletext}>Tipo: </Text>
            <Text style={[Styles.titletext,{justifyContent: 'flex-end' }]}>{props.point_type_name}</Text>
        </View>
        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Dirección: </Text>
            <Text style={[Styles.simpletext,{width:'70%'}]}>{props.direction}</Text>
            <Image source={require('../drawables/marker.png')} style={{height: 30, width:30,resizeMode:'contain',justifyContent: 'flex-end' }} />
        </View>
        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Cita: </Text>
            <Text style={Styles.simpletext}>{operations.convert_utc_local1(props.time)}</Text>

        </View>
        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Llegada: </Text>
            <Text style={Styles.simpletext}>{operations.convert_utc_local1(props.arrival_time)}</Text>

        </View>
        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Salida: </Text>
            <Text style={Styles.simpletext}>{operations.convert_utc_local1(props.leave_time)}</Text>

        </View>

        </TouchableOpacity>
    )



}

export default Reparto