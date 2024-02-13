import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState }from 'react';
import { View,Text,Button ,StyleSheet} from 'react-native';
import Api from '../api/intranet'
import { useNavigation } from '@react-navigation/native';
import { Table, Row,Rows } from 'react-native-table-component';
import Styles from '../styles/styles'
import moment from 'moment';


var status=[]
var fecha_ini=[]
var fecha_fin=[];
var tablehead=['Estatus','fecha inicio','Fecha Fin']
        

function Nom87 (){
    const navigation = useNavigation();
    const [items, setItems] = useState([])
    const [data,setData]=useState([])
    const[day, setday]= useState('')
    const [isload,setIsload]= useState(1)
    const [message,setMessage]=useState('Cargando información ...')


    useEffect(() => {
     

       
          
            const fecha = new Date();
            var datehora=moment(fecha).format('DD/MM/YYYY HH:mm');
            setday(datehora)
    
            getNom87()
       
          return () =>{
          } 

    },[])


    const getNom87=async()=>{
        status=[]
        fecha_ini=[]
        fecha_fin=[]
        var new_event=[]
    

        try{

            const nom87=await Api.getNom87(global.id_operador)
            setData(nom87)
            console.log(nom87)
            for(var i=0; i<nom87.listDreams.length;i++){
                console.log('agregando i'+i)
                status.push('Inactivo')
                status.push('Activo')
                fecha_ini.push(nom87.listDreams[i].fecha_inicio)
                fecha_ini.push(nom87.listDreams[i].fecha_fin)
            }
            for(var j=1;j<fecha_ini.length;j++){
               
                fecha_fin.push(fecha_ini[j])
    
            }
            fecha_fin.push('')
            for(var y=0;y<fecha_fin.length;y++){
                var event={
                    id:y,
                    status:status[y],
                    fecha_inicio:fecha_ini[y],
                    fecha_fin:fecha_fin[y],
                    
                }
                console.log('agregando'+y)
                new_event.push(event)
            }
            setItems(new_event)
            setIsload(0)
           


        }catch(ex){
            console.log(ex)

        }


    }
    const opendetail=()=>{
       
     
       navigation.navigate('nom87detail',{ listDreams:items})
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
               <Text style={style.textbutton}>Fecha de consulta: </Text>
               <Text style={Styles.simpletext}>{day}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Empresa </Text>
               <Text style={Styles.simpletext}>TRANSPORTES MEXAMERIK</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Dirección: </Text>
               <Text style={Styles.simpletext}>AV. ADOLFO RUIZ CORTINES No 20, INT 53, COL  LOMAS DE ATIZAPAN 2A SECCION, MUNICIPIO ATIZAPAN DE ZARAGOZA, ESTADO DE MÉXICO, CP 52977</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Operador </Text>
               <Text style={style.textbutton}>{data.Operation_Type_Alias}: </Text>
               <Text style={Styles.simpletext}>{global.nombre} </Text>
              

           </View>
          
            <View style={style.horizontal}>
               <Text style={style.textbutton}>licencia: </Text>
               <Text style={Styles.simpletext}>{data.License} </Text>
               <Text style={style.textbutton}>  Vig: </Text>
               <Text style={Styles.simpletext}>{data.vigencia}</Text>

           </View>
           <View style={style.horizontal}>
           <Text style={style.textbutton}>Origen: </Text>
            <Text style={Styles.simpletext}>{global.origen}</Text>
              

           </View>
           <View style={style.horizontal}>
           <Text style={style.textbutton}>Destino: </Text>
               <Text style={Styles.simpletext}>{global.destino}</Text>
              

           </View>
           <View style={{margin:10}}>
           <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',}} style={{color:'#000000'}}> 
           <Row  data={[' Ultimas',' Activo', ' Descanso']} style={style.head} textStyle={style.head} />
           <Row data={[' 24 Hrs',data.act_hrs24,data.inac_hrs24]} textStyle={style.text} />
           <Row data={[' 05:30 Hrs',data.act_hrs5,data.inac_hrs5]} textStyle={style.text} />
           </Table>
           </View>
           <View style={{marginTop:10,marginRight:40,marginLeft:40}} >
               <Button
               title="Ver detalles"
               color="#cca028"
               onPress={opendetail}
               />
              
           </View>

           
        </View>

    )
}
};
const style=StyleSheet.create({
    logo:{
        width:95,
        height:95,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode:'contain',
    },
    centerimage:{
        justifyContent: 'center',
    alignItems: 'center',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      
    
      },
      name:{
          marginLeft:10,

      },

      head: {
          height: 40,
          color:'#ffffff',
          backgroundColor: '#cca028',
           
    },
    rows: {
        height: 40,
        color:'#393d42',
        backgroundColor: '#cca028',
         
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
    color:'#393d42',


   },
  
    horizontal:{
      
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
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
export default Nom87;