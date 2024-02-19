import React, { useEffect, useState } from 'react';
import { View,Text,Button,StyleSheet,Image,Pressable} from 'react-native';
import TMS from '../api/tms'
import Styles from '../styles/styles'


function Unidad(){
    const [unidad, setUnidad] = useState([]);
    const [isload,setIsload]= useState(1)
    const [message,setMessage]=useState('Cargando información ...')


    useEffect(() => {
        getunidad(global.vehicle_id)

       
    }, [])

    const getunidad=async(vehicle_id)=>{
       
        try{

            const unidad=await TMS.getUnIdad( vehicle_id)
            console.log(unidad)
            setUnidad(unidad)
            setIsload(0)
        }catch(ex){
            setMessage('No hay unidad asignada')
            console.log(ex)

        }


    }
    if(isload==1){
        return(
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}> 
                <Text style={Styles.simpletext}>{message}</Text>

            </View>
        )

    }
    else{


    return(

        <View>
            <View style={style.horizontal}>
               <Text style={style.textbutton}>Nombre de la unidad: </Text>
               <Text style={Styles.simpletext}>{unidad.alias}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Placas: </Text>
               <Text style={Styles.simpletext}>{unidad.tag}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={[style.textbutton,{width:'35%'}]}>Configuración motriz: </Text>
               <Text style={[Styles.simpletext,{width:'60%'}]}>{unidad.vehicle_performance_type}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Tipo de unidad: </Text>
               <Text style={Styles.simpletext}>{unidad.type}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>NO ejes: </Text>
               <Text style={Styles.simpletext}>{unidad.axis_number}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Grupo: </Text>
               <Text style={Styles.simpletext}>{unidad.group}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>NO poliza: </Text>
               <Text style={Styles.simpletext}>{unidad.ins_policy}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Aseguradora: </Text>
               <Text style={Styles.simpletext}>{unidad.insurance}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Fecha poliza: </Text>
               <Text style={Styles.simpletext}>{unidad.ins_expiration}</Text>
           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Telefono de la aseguradora: </Text>
               <Text style={Styles.simpletext}>{unidad.ins_phone}</Text>
           </View>
           
        </View>

    )

    }

}
const style=StyleSheet.create({
    logo:{
        width:65,
        height:85,
        resizeMode:'contain',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      
    
      },
      name:{
          marginLeft:10,

      },
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,

      },
      textbutton:{
        fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',

    },
    menuicon:{
        width:40,
        height:40,
        margin: 5,
        resizeMode:'contain',
    },
   text:{
       
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,

   },
  
    horizontal:{
      
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 39,
        borderRadius: 4,
        elevation: 3,
     

    },
    menuitems:{
       
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        margin:5,
    },
    vertical:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    }
  
  })
export default Unidad