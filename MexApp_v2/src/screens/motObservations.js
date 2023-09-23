import React, { useEffect,useState } from 'react'
import { View,Text } from 'react-native'
import MtoObsList from '../containers/mtoobslist'

function MtoObservations(props){
    var observations=props.observations

    return(
        <View style={{width:'100%',height:'100%'}}>
            <MtoObsList items={observations} />
           
        </View>
        )


}
export default MtoObservations

// 