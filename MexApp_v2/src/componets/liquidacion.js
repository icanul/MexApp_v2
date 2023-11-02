import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable
}from 'react-native';
import Styles from '../styles/styles'
import { useNavigation } from '@react-navigation/native';


function Liquidacion (props){
  const navigation = useNavigation();
  const[fecha,setfecha]=useState('')
  const[fechainit,setfechainit]=useState('')
  const[fechafin,setfechafin]=useState('')

  useEffect(() => {

    var f=unixtolocal(props.time)
    var f2=unixtolocal(props.from_time)
    var f3=unixtolocal(props.to_time)
    setfecha(f) 
    setfechainit(f2) 
    setfechafin(f3)  
   
}, [])


  const unixtolocal =(fecha)=> {
    try {
      if(fecha==null){
        return ''


      }else{
        var date = new Date(fecha);
      var year=date.getFullYear()
      var month=date.getMonth()+1
      var day=date.getDate()
      var hora=date.getHours()
      var minute=date.getMinutes()
      var f= day+'-'+month+'-'+year+' '+hora+':'+minute
    
      return f;

      }
    
      
      
    } catch (error) {
      return ''
      
    }
    


  }
  const opendetail=()=>{
    navigation.navigate('liqdetail',{ items:props})
 }


    return(
<Pressable style={Styles.contencard} onPress={opendetail}>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>NO liquidación.</Text>
    <Text style={Styles.simpletext}>{props.id}</Text>
    <Text style={Styles.titletext}>Balance total.</Text>
    <Text style={Styles.simpletext}>${props.total_balance}</Text>
    
  </View>
  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>Fecha:</Text>
  <Text style={Styles.simpletext}>{fecha}</Text>
  </View>
  <View style={Styles.horizontal}>

    <Text style={Styles.titletext}>Unidad</Text>
    <Text style={Styles.simpletext}>{props.preliquidation_vehicle}</Text>
  </View>



</Pressable>
    )

}

export default Liquidacion