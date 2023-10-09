import React, { useEffect, useState,useRef } from 'react';
import { View,Image,ScrollView,Text,RefreshControl, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";

function Pandape (props){

  const webViewRef = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
       
     return () =>{
      unsubscribe();
        
      } 
  }, [])
      
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        webViewRef.current.reload(); 
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }


      if(isConnected){
        return(
          <ScrollView 
          style={{backgroundColor:'#c0c0c0'}}
          contentContainerStyle={{ flexGrow: 1,width:'100%',height:'100%' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          
        <WebView 
         ref={(ref) => webViewRef.current = ref}
         source={{ uri: 'https://mexamerik.hcm.pandape.com/Inicio' }} 
         javaScriptEnabled={true} />    
                   </ScrollView>

         )

      }else{
        return(
          <ScrollView 
          style={{backgroundColor:'#c0c0c0'}}
          contentContainerStyle={{ flexGrow: 1,width:'100%',height:'100%' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          
            <View style={{backgroundColor:'#ffffff'}}>
              <Text>Estas en el modo offline; ya que este momento no cuentas con conexion a internet pero puedes seguir usan MexApp </Text>
            <Image
              style={{ width:'100%',
              
                alignItems:'center',
                resizeMode:'contain',}}
              source={require('../drawables/logo.png')}/>
            </View>
          </ScrollView>
          )
      }
   
 

};
export default Pandape;