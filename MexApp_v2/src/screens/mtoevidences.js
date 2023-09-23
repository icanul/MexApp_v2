import React, { useEffect,useState } from 'react'
import { View} from 'react-native'
import MtoEviList from '../containers/mtoeviist'


function MtoEvidences(props){
    var evidences=props.evidences
    return(
        <View style={{width:'100%',height:'100%'}}>
            <MtoEviList items={evidences}/>
        </View>
    )

}
   
export default MtoEvidences