import React, { useEffect,useState } from 'react'
import { View,Text,Image } from 'react-native'
import moment from 'moment/moment';


function MtoEvidence(props){
    var image=props.mediaLink
    return(
        <View>
              <Image 
          style={{  width: 110,height: 160,resizeMode:'contain', borderWidth:2.5,borderColor: "#000",  borderRadius: 30 / 2, margin:5}}
          source={{uri: image}} />
            <Text>{props.time}</Text>
             
        </View>
    )

}
export default MtoEvidence