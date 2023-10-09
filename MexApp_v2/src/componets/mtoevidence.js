import React, { useEffect,useState } from 'react'
import { View,Text,Image } from 'react-native'
import moment from 'moment/moment';


function MtoEvidence(props){
    var image=props.mediaLink
    
    const[fecha,setfecha]=useState('')

    useEffect(() => {
        const fechaLocal = props.time
    const fechaUtc = moment.utc(fechaLocal);
    setfecha(fechaUtc.format('YYYY-MM-DD HH:MM'))


    }, [])
    return(
        <View style={{justifyContent:'center',margin:5}}>
              <Image 
          style={{  width: 110,height: 160,resizeMode:'contain', borderWidth:2.5,borderColor: "#000",  borderRadius: 30 / 2, margin:5}}
          source={{uri: image}} />
            <Text style={{borderWidth:0.8,borderColor: "#000",color:'#000'}}>{fecha}</Text>
             
        </View>
    )

}
export default MtoEvidence