import React from "react";
import { View,Text,Pressable,StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { version } from '../../package.json';



function Help(props){
    const navigation = useNavigation();

    const salir=()=>{
        props.setHelpmodal(false)

    }
 
    const openlog=()=>{
        navigation.navigate('log')
        props.setHelpmodal(false)
        
    }


    return(
        <View  style={style.content}>
            <View style={style.modal} >
               <Text  style={style.title}>Acerca de MexApp</Text>
              
                <Text>MexApp 1.0.42</Text>
         
                <View style={style.horizontal}>
              
              <Pressable 
            onPress={openlog}
              style={style.button}>
                  <Text style={style.textbutton}>Log</Text>
              </Pressable>
              <Pressable 
              onPress={salir}
              style={style.button1}>
                  <Text style={style.textbutton}>salir</Text>
              </Pressable>
              </View>
            </View>
            
        </View>
    )





}

const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

    },
    checkbox:{
        flexDirection:'row',
  
    },
    check_s:{
        marginTop:10,

    },
    image:{
        width:200,
        height:200,
    },

    modal:{
      width:300,
      height:200,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5


    },
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
     
   

  },

    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
    textbutton:{
        textAlign: 'center',
        color: '#ffffff',
     
        

    },
    title:{
      
        textAlign: 'center',
        fontSize:16,
        fontWeight: "bold",
        color:'#000000',

       
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },

})

export default Help