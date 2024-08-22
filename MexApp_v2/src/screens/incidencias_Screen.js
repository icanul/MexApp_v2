import React, { useEffect,useState } from 'react'
import { View } from 'react-native'
import tms from '../api/tms';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EvidenciasScreen from './evidenciasScreen';
import Incidencia_solicitud from './incidencia_solicitud';
import Incidencia_solicitud_sc from './incidencia_solicitud_sc';


const Tab = createMaterialTopTabNavigator();

function Incidencias_Screen(props){
    const[observation,setObservation]=useState([])
    const[evidences,setevidence]=useState([])
    const [solicitud,setSolicitud]=useState('Sin solicitud')

    useEffect(() => {
      setSolicitud('Solicitud '+global.solicitud)
    },[])


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
     name="incidencias"
     options={{
        unmountOnBlur: true,
     
        headerShown: false,
        gesturesEnabled: false,   
        title: 'Enviadas'}}>

     {props => <Incidencia_solicitud {...props} observations={observation}/>}
     </Tab.Screen>
     <Tab.Screen 
     name="evidences"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
        gesturesEnabled: false,   
        title: 'No enviados' }}>

     {props => <Incidencia_solicitud_sc {...props} evidences={evidences}/>}
     </Tab.Screen>



             </Tab.Navigator>



    )


}
export default Incidencias_Screen;