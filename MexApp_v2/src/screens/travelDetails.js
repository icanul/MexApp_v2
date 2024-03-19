import React from 'react';
import { View,Text,Button,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import operations from '../utils/operations';
import PuntoColorido from '../componets/PuntoColorido';



function TravelDetails (props){
    const travel=props.route.params.props;  


   
    return(
        <ScrollView>
          
            <Text style={style.textbutton}>{travel.agreement}</Text>
    
            <View style={style.horizontal}>
                <Text style={style.text1}>Shipment: </Text>
                <Text style={style.text3}>{travel.shipment}</Text>
                <Text style={style.text1}>Carta porte: </Text>
                <Text style={style.text3}>{travel.pro_number}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Viaje       Confirmado:</Text>
                <Text style={style.text4}>{operations.fechaFormateada(travel.travel_confirmed_date)}</Text>
                <PuntoColorido color={travel.travel_confirmed_semaphore}/>


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
                <Text style={style.text2}>{operations.fechaFormateada(travel.pickup_datetime)}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Llegada Origen: </Text>
                <Text style={style.text2}>{operations.fechaFormateada(travel.arrival_date_origin)}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Salida Origen: </Text>
                <Text style={style.text2}>{operations.fechaFormateada(travel.output_date_origin)}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Carga       Confirmada:</Text>
                <Text style={style.text4}>{operations.fechaFormateada(travel.pickup_confirmed_date)}</Text>
                <PuntoColorido color={travel.pickup_confirmed_semaphore}/>
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
                <Text style={style.text2}>{operations.fechaFormateada(travel.delivery_datetime)}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Llegada Destino: </Text>
                <Text style={style.text2}>{operations.fechaFormateada(travel.arrival_date_destiny)}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Salida Destino: </Text>
                <Text style={style.text2}>{operations.fechaFormateada(travel.output_date_destiny)}</Text>

            </View>
            <View style={style.horizontal}>
                <Text style={style.text1}>Descarga       Confirmada:</Text>
                <Text style={style.text4}>{operations.fechaFormateada(travel.delivery_confirmed_date)}</Text>
                <PuntoColorido color={travel.delivery_confirmed_semaphore}/>


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
          width:"25%",

         

      },

      text2:{
        margin:5,
        width:"72%",
        color:'#393d42',
          fontSize:14


    },
    text3:{
        margin:5,
        width:"22%",
        color:'#393d42',
          fontSize:14


    },
    text4:{
        margin:5,
        width:"45%",
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