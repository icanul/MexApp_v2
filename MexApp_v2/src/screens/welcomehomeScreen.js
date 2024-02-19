import React , { useEffect, useState }from 'react';
import { View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import storageData from '../utils/storageData';
import { useNavigation } from '@react-navigation/native';




function WelcomeHome(props){
    const navigation = useNavigation();
    const [data,setdata]= useState([])
    const [cedula,setcedula]= useState('')

    useEffect(() => {
        getdata()
    
    
      },[])

      const removedata = async (key) => {
        try {
            await storageData.deleteData("@user_storage")
            await storageData.deleteData("@gasto")
            await storageData.deleteData("@info_operador")
            await storageData.deleteData("@evidenciagasto")
            await storageData.deleteData("@evidence")
            await storageData.deleteData("@confirmarcarga")
            await storageData.deleteData("@confirmardescarga")
            await storageData.deleteData("@confirmarsolicitud")
            await storageData.deleteData("@dreams_current")//travelCurrent_storage
            await storageData.deleteData("@travelCurrent_storage")//travelCurrent_storage
           console.log('se borro todo')
           props.setLogget(0)
            return true;
        }
        catch(exception) {
            console.log("error"+exception)
            return false;
        }
    }

      const getdata=async () =>{
        const user=await storageData.consultData('@user_storage')
        if(user!= null){
            var convert=JSON.parse(user)
            setcedula(convert.cell_data[0].cell__name)
            setdata(convert)
        }

      }
      const salir=()=>{
        console.log(props)
        props.setModalVisible(false)

      }
      const opencontact=()=>{
        navigation.navigate('contactos')

      }

    return(
    
    <View style={style.content}>
         <View style={style.modal} >
            <View style={style.interlineado}>
            <Text style={style.title1}>BIENVENIDO</Text>

            </View>
            <View style={{marginTop:25,marginBottom:35}}>

        <Text style={style.title}>{data.nombre}</Text>
        <Text style={style.title2}>CEOP {cedula}</Text>
        <Text style={style.title2}>UNIDAD {data.unidad}</Text>

            </View>
       
        <Text style={style.text}>Sí la información no es correcta, presione el botón SALIR</Text>
        <View style={style.horizontal}>
        <TouchableOpacity style={style.button} onPress={salir}>
            <Text  style={style.textbutton}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button1} onPress={removedata}>
            <Text  style={style.textbutton}>SALIR</Text>
        </TouchableOpacity>
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
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#1c55a7bf',
      elevation: 5,
      borderRadius: 10, 


    },
    interlineado:{
        width:'100%',
        borderWidth: 2, // Agrega un borde
        borderColor: '#ffffffCC',
        borderRadius: 5,


    },
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
      margin:15,
     
   

  },
  text:{
    fontSize:16,
    color:'#ffffff',
    textAlign: 'center',



  },

    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        

    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,
      marginTop:10,
      elevation: 5,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      

  },
    textbutton:{
        textAlign: 'center',
        color: '#ffffff',
     
    },
    title:{
      
        textAlign: 'center',
        fontSize:18,
        margin:5,
        color:'#ffffff',

       
    },
    title2:{
      
        textAlign: 'center',
        fontSize:18,
        color:'#ffffff',

       
    },
    title1:{
      
        textAlign: 'center',
        fontSize:21,
        fontWeight: "bold",
        marginTop:15,
        marginBottom:15,
        color:'#ffffff',
       
    },

    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },

})
export default WelcomeHome