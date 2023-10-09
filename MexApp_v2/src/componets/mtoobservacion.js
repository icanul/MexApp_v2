import React, { useEffect,useState } from 'react'
import { View,Text } from 'react-native'
import Styles from '../styles/styles'
import moment from 'moment'; // Si estás usando ES6 modules
 

function mtoObservatiion(props){
    const[fecha,setfecha]=useState('')

    useEffect(() => {
        const fechaLocal = props.time
    const fechaUtc = moment.utc(fechaLocal);
    setfecha(fechaUtc.format('YYYY-MM-DD HH:MM'))


    }, [])

    
    console.log(props)
    return(
        <View style={Styles.contencard}>
            <View style={Styles.horizontal}>
                <Text style={Styles.titletext}>Comentario</Text>
                <Text style={Styles.simpletext}>{props.observation_text}</Text>
            </View>        
            <View style={Styles.horizontal}>
                <Text style={Styles.titletext}>Ingresado por</Text>
                <Text style={Styles.simpletext}>{props.user}</Text>
            </View>       
            <View style={Styles.horizontal}>
                <Text style={Styles.titletext}>Fecha</Text>
                <Text style={Styles.simpletext}>{fecha}</Text>
            </View>           

        </View>
    )

}
export default mtoObservatiion