import React from 'react';
import { View,Text,StyleSheet, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/styles'
import operations from '../utils/operations';
import PuntoColorido from './PuntoColorido';




function Travel (props){
    const navigation = useNavigation();
 
   //delivery_datetime
    return(
        <Pressable 
        style={Styles.contencard}
        onPress={() => navigation.navigate('travelsdetails',{props:props})}>

            <View style={{margin:8}}>
            <Text style={Styles.titletext}>{props.agreement}</Text>
          
                <Text style={Styles.simpletext}>{props.client}</Text>

      
            <View style={{flexDirection:'row'}}>
                <Text style={Styles.titletext}>SOLICITUD:  </Text>
                <Text style={Styles.simpletext}>{props.id}</Text>

            </View>
            <View style={{flexDirection:'row'}}>
                 <Text style={Styles.titletext}>Finalizado:  </Text>
                 <Text style={Styles.simpletext}>{operations.fechaFormateada(props.delivery_datetime)}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                 <Text style={Styles.titletext}>Circulo de servicio:  </Text>
                 <PuntoColorido color={props.travel_confirmed_semaphore}/>
                 <PuntoColorido color={props.pickup_confirmed_semaphore}/>
                 <PuntoColorido color={props.delivery_confirmed_semaphore}/>
              
            </View>

          </View>
           
        </Pressable>

    )

};


export default Travel;