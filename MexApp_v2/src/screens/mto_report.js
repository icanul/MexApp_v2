import React, { useEffect,useState } from 'react'
import { View } from 'react-native'
import tms from '../api/tms';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MtoEvidences from './mtoevidences';
import MtoObservations from './motObservations';



const Tab = createMaterialTopTabNavigator();

function MtoDetail(props){
    const[observation,setObservation]=useState([])
    const[evidences,setevidence]=useState([])

    useEffect(() => {
        console.log(props.route.params.id)
        getdata()

    },[])
    const getdata=async()=>{
        console.log(global.token)
       var token=global.token
       var id =props.route.params.id
    
        try {
            const getreports= await tms.getdetailreport(id,token)
            setObservation(getreports.observations)
            setevidence(getreports.evidences)
            console.log(getreports.evidences)
           
       
    
          } catch (error) {
            console.log('Error:::'+error)
            
          }


    }




    return(
        <Tab.Navigator
        initialRouteName="observations"
        
        screenOptions={{
            tabBarActiveTintColor: '#CBA052',
            tabBarIndicatorStyle:{
              backgroundColor:'#CB333B'
            },
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { 
                backgroundColor: '#ffffffcc',
                height:45, },
          }}>
            <Tab.Screen 
     name="observations"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
        gesturesEnabled: false,   
        title: 'observaciones' }}>

     {props => <MtoObservations {...props} observations={observation}/>}
     </Tab.Screen>
     <Tab.Screen 
     name="evidences"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
        gesturesEnabled: false,   
        title: 'Evidencias' }}>

     {props => <MtoEvidences {...props} evidences={evidences}/>}
     </Tab.Screen>



             </Tab.Navigator>



    )


}
export default MtoDetail;