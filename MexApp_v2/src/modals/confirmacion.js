import React,{ useState,useEffect} from 'react';
import { View,Text,StyleSheet,Image, Pressable,Alert} from 'react-native';
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Confirmated (props){
    const context=props
    const [isload,serLoad]= useState(false);

    useEffect(() => {
      console.log(isConnected)
      const interval = setInterval(() => {
        validate_offline()
    
        }, 1000);
        return () =>{
          clearInterval(interval);
        } 
  }, [])

  const validate_offline= async () => {

    const jsonValue = await AsyncStorage.getItem('@confirmarsolicitud')       
    if(jsonValue != null){
      send()
    }
  }

    async function Confirmar(){
      if(props.isConnected==true){
        serLoad(true)
        const fecha = new Date();
        var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()        
        try {
          const confirmated=await Api.confirmar(context.solicitud,1,"",datetime)
          if( confirmated.status==200|| confirmated.status==202)
          {
              Alert.alert("Se confirmo correctamente")
          }
          send()

        } catch (error) 
        {
            var confirmation={
                id:1,
                solicitud:context.solicitud,
                observation:'',
                datetime:datetime
            }
            confirmationStore(confirmation)
            send()        
        }
      }
      else
      {
        const fecha1 = new Date();
        var datetime=fecha1.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes() 
        Alert.alert
        (
          'MexApp',
          'NO hay conexión desea guardar la confirmacion',
          [
            {
              text: 'si',
              onPress: () => {
                var confirmation={
                  id:1,
                  solicitud:context.solicitud,
                  observation:'',
                  datetime:datetime
              }
              confirmationStore(confirmation)
              send()

              },
            },
           
            {
              text: 'Cancelar',
              onPress:()=>{
                send()
              }
            },
          ]
        )
      }    
    }
    const confirmationStore = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@confirmarsolicitud', jsonValue)
          Alert.alert(
            "No se pudo enviar",
            "confirmación de solicitud guardada. se enviara cuando tengas conexión a internet",
            [
           
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        } catch (e) {
          // saving error
        }
      }
      
    const send=()=>{
       
        context.setModalVisible(false)
        context.onRefresh()
     }

     if(isload==true){

        return(
            <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
            
        </View>

        )
    }else{
    return(
        <View style={style.content}>
              <View style={style.modal} >
                <Text style={style.title}>Solicitud {context.solicitud} asignada</Text>
                <Text style={style.title}>Debes confirmar para poder continuar</Text>
    
                <View style={style.horizontal}>
                
                <Pressable 
                 onPress={Confirmar}
            
                style={style.button}>
                    <Text style={style.textbutton}>Confirmar</Text>
                </Pressable>
                </View>
    
                </View>
              </View>

    )
}


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

export default Confirmated
