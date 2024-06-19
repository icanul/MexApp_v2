import React, { useState } from 'react'
import { View,Text,Alert,StatusBar,StyleSheet,Platorm,Pressable,TextInput, ImageBackground,ScrollView,Image} from 'react-native';
import Api from'../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';


function LoginScreen (props){
    const [number,setnumber]=useState('');
    const [isload,serLoad]= useState(false);

    async function login(){
      serLoad(true)   
        try {
            const user=await Api.login( number,global.version, global.fcmToken)
    
            storeData(user)
            global.id_operador = user.id;
            global.imageOperador=user.image
            global.nombre = user.nombre;
            global.alias= user.unidad;
            global.driver_image= user.driver_image
            global.vehicle_id=user.unidad_id
            console.log('el isd unidad'+user.unidad_id)
            global.token=true
            props.setLogget(1)
            
        } catch (error) {
            global.token=false
            Alert.alert("no estas asignado:")
            serLoad(false) 
            
        }
      
    }
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@user_storage', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }



 

      if(isload==true){

        return(
            <View style={{ flex: 1,
              justifyContent: "center",
              alignItems: "center",
         
              backgroundColor:'#eaeaeacc',}}>
            <Image  
            style={{ width:200,height:200,}} 
        source={require('../drawables/loading.gif')}/>
            
        </View>

        )
    }else{
    return(
     <View
     style={styles.container}
     >
        <ImageBackground source={require('../drawables/portada.png')} resizeMode="cover" style={styles.image}>
             <View style={styles.form}>
               <Image />
                
                <View style={styles.horizontal}>
                    <Text style={styles.text}>+52</Text>
                    
                <TextInput 
                style={styles.input}
                placeholderTextColor='#ffffff'
                placeholder="Ingrese su numero telefonico"
                autoCapitalize = 'none'
                onChangeText={setnumber}
              
                keyboardType="numeric"
                />
                </View>
                <View style={styles.horizontal}>
        
            
                </View>
                           
                <Pressable
                style={styles.button} 
                onPress={login}            
                >  
                <Text style={styles.textbutton}>Enviar</Text>
                </Pressable>

            </View>
           
            
            </ImageBackground>




      </View>

    )
  }

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textbutton:{
        fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 39,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#cc141c',
      },
    text: {
        height:"100%",
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",        
        marginTop:12,
      },
    form:{
        backgroundColor:'#4b4b4bbb'  ,

      
        marginLeft:40,
        marginRight:40,
    },
    userlogo:{
        width:30,
        height:50,
        resizeMode:'contain',

    },
    horizontal:{
       
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',

    },

    input:{
        width:'80%',
        color:'#ffffff',
        marginLeft:5,
        justifyContent:'center',
        alignContent:'center', 
      
    },
    image: {
      flex: 1,
      justifyContent: "center",

    },
    boton:{
       
        justifyContent:'center',
        alignContent:'center',
       
    },
    boton:{
        color:'#ffffff'

    }
 
  });

export default LoginScreen;