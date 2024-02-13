import React from 'react';
import { View,Text,StyleSheet, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/styles'
import operations from '../utils/operations';




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
            <Text style={Styles.simpletext}>{operations.fechaFormateada(props.delivery_datetime)}</Text>
            </View>
           
        </Pressable>

    )

};


export default Travel;