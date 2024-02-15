import React,{useState,useEffect} from 'react';
import { Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/homescreen';
import Detailscreen from '../screens/detailscreen';
import CameraScreen from '../screens/cameraScreen'
import TravelsTabs from './travels_tabs';
import DreamsScreen from '../screens/dreamsScreen';
import MLoginScreen from '../screens/mloginscreen';
import NLoginScreen from '../screens/nloginscreen';


const Tab = createMaterialTopTabNavigator();

function MyTabs(props) {
const context=props;


  return (
    <Tab.Navigator
    initialRouteName="Home"
    
    screenOptions={{
      swipeEnabled:false,
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
          options={{
            tabBarShowLabel:false,
              tabBarIcon:({ tintColor,focused }) => {
                let iconName;
                iconName = focused
                //<img src="https://img.icons8.com/glyph-neue/64/undefined/present.png"/>
                ? 'https://img.icons8.com/glyph-neue/50/CBA052/home.png'
              : 'https://img.icons8.com/glyph-neue/64/9c9c9c/home.png';  
                
                return <Image
                
                source={{uri:iconName}}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: tintColor }}
              /> 
      
              },
    
              }}
    
      name="Home" >
         {props => <HomeScreen {...props} setversion={context.setversion} setLogget={context.setLogget} isConnected={context.isConnected}setConected={context.setConected}/>}
         </Tab.Screen>

         <Tab.Screen 
          options={{
            tabBarShowLabel:false,
              tabBarIcon:({ tintColor,focused }) => {
                let iconName;
                iconName = focused
                //<img src="https://img.icons8.com/glyph-neue/64/undefined/present.png"/>
                ? 'https://img.icons8.com/glyph-neue/50/CBA052/truck.png'
                : 'https://img.icons8.com/glyph-neue/64/9c9c9c/truck.png';  
                
                return <Image
                
                source={{uri:iconName}}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: tintColor }}
              /> 
      
              },
    
              }}
    
      name="travels" >
         {props => <TravelsTabs {...props} setversion={context.setversion} isConnected={context.isConnected}setConected={context.setConected}/>}
         </Tab.Screen>


  
       <Tab.Screen 
         options={{
          tabBarShowLabel:false,
            tabBarIcon:({ tintColor,focused }) => {
              let iconName;
              iconName = focused
              ? 'https://img.icons8.com/glyph-neue/50/CBA052/present.png'
              : 'https://img.icons8.com/glyph-neue/64/9c9c9c/present.png';  
              
              return <Image
              
              source={{uri:iconName}}
              resizeMode="contain"
              style={{ width: 25, height: 25, tintColor: tintColor }}
            /> 
    
            },
  
            }}
      name="dreams" >
         {props => <DreamsScreen {...props} setLogget={context.setLogget} setConected={context.setConected}/>}
         </Tab.Screen>



       <Tab.Screen   options={{
        tabBarShowLabel:false,
            tabBarIcon:({ tintColor,focused }) => {
              let iconName;
              iconName = focused
              ? 'https://img.icons8.com/glyph-neue/50/CBA052/menu.png'
              : 'https://img.icons8.com/glyph-neue/64/9c9c9c/menu.png';  
              
              return <Image
              
              source={{uri:iconName}}
              resizeMode="contain"
              style={{ width: 25, height: 25, tintColor: tintColor }}
            /> 
    
            },
  
            }}name="Settings" >
            {props => <Detailscreen {...props} setLogget={context.setLogget} is_logged={context.is_logged}/>}

              
              </Tab.Screen>
        
    </Tab.Navigator>
  );
}
export default MyTabs;