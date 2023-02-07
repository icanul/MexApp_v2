import React from 'react';
import { View,Text,Button,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';



function TravelDetails (props){
    const travel=props.route.params.props;  


   
    return(
        <ScrollView>
          
            <Text style={style.textbutton}>{travel.agreement}</Text>
    
            <View style={style.horizontal}>
                <Text style={style.text1}>Shipment: </Text>
                <Text style={style.text2}>{travel.shipment}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Carta porte: </Text>
                <Text style={style.text2}>{travel.pro_number}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>cliente: </Text>
                <Text style={style.text2}>{travel.client}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Origen: </Text>
                <Text style={style.text2}>{travel.origin}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Direccion Origen: </Text>
                <Text style={style.text2}>{travel.origin_address}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Cita carga: </Text>
                <Text style={style.text2}>{travel.pickup_datetime}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Destino</Text>
                <Text style={style.text2}>{travel.destiny}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Direcion Destino: </Text>
                <Text style={style.text2}>{travel.destiny_address}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Cita Descarga: </Text>
                <Text style={style.text2}>{travel.delivery_datetime}</Text>

            </View>
           
        </ScrollView>

    )

};
const style=StyleSheet.create({
 
  
      text1:{
          margin:5,
          fontWeight: 'bold',
          fontSize:15,
          color:'#393d42',
          width:"20%",

         

      },

      text2:{
        margin:5,
        width:"75%",
        color:'#393d42',
          fontSize:14


    },
      textbutton:{
        fontSize: 16,
        width:'100%',
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    alignItems: 'center',
    alignContent:'center',
    textAlign: 'center',
    justifyContent:'center',
    backgroundColor:'#cca028',
    color:'#ffffff'


    },
    menuicon:{
        width:40,
        height:40,
        margin: 5,
        resizeMode:'contain',
    },
   
  
    horizontal:{
      
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
  
        borderRadius: 4,
        elevation: 3,
     

    },
    menuitems:{
       
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        margin:5,
    },
    vertical:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    }
  
  })
export default TravelDetails;