import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable
}from 'react-native';
import Styles from '../styles/styles'
import { useNavigation } from '@react-navigation/native';
import operations from '../utils/operations';

function Gasto (props){
  console.log(props)


  const[fecha,setfecha]=useState('')
  const[fechainit,setfechainit]=useState('')
  const[fechafin,setfechafin]=useState('')
  const navigation = useNavigation();
  const [color,setcolor]=useState('#000000')
  const [status,setstatus]=useState('')



  useEffect(() => {

    var f=local(props.requested_on)
    var f2=local(props.required_on)
    var f3=local(props.requested_on)
    setfecha(f) 
    setfechainit(f2) 
    setfechafin(f3) 
    var statuss=props.status_id
  

    switch (statuss){
      case 1:
        
          setcolor('#FFDF00')
          break;
      case 2:
       
        setcolor('#ffa111')
          break;
      case -3:
         
          setcolor('#D23411')
          break;
      case 4:
         
          setcolor('#FFDF00')
          break;
      case 5:
          setcolor('#006400')
          break;
      case 6:
          setcolor('#909090')
            break;
      case 7:
            setcolor('#D23411')
            break;
      case 8:
            setcolor('#3AE1E1')
            break;
      default:
            setstatus('sin status')

  }
  console.log(status)
  
   
}, [])

function confirmar(){

  if(props.status_id==-3){
    navigation.navigate('cameragasto',{ id:props.id})


  }
 

}

   const local=(fecha)=> {
    if (fecha==null){
      return ''

    }else{
      try {
        var date= new Date(fecha)
        var year=date.getFullYear()
        var month=date.getMonth()+1
        var day=date.getDate()
        var  hora=date.getHours()
        var minute=date.getMinutes()
        var f= day+'-'+month+'-'+year+' '+hora+':'+minute
 
        return f
     
        
      } catch (error) {
        console.log(error)
        return ''
        
      }

    }

   }


    return(
<Pressable style={Styles.contencard} onPress={confirmar}>
  <Text style={{color:color, textAlign:'right',marginTop:10}}>{props.status} </Text>
  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>NO Gasto:</Text>
    <Text style={Styles.simpletext}>{props.id}</Text>
  
    <Text style={Styles.titletext}>Fecha: </Text>
    <Text style={Styles.simpletext}>{operations.fechaFormateada(props.requested_on)}</Text>
   
  </View>

  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>Tipo</Text>
    <Text style={Styles.simpletext}>{props.type}</Text>
    <Text style={Styles.titletext}>Importe.</Text>
    <Text style={Styles.simpletext}>${props.amount.toLocaleString()}</Text>
   
  </View>

  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>Solicitud</Text>
    <Text style={Styles.simpletext}>{props.shipment_id}</Text>
   
  </View>
 
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Comentario</Text>
    <Text style={Styles.simpletext}>{props.comment}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Usuario valida: </Text>
    <Text style={Styles.simpletext}>{props.responsible_department}</Text>
  </View>


  

</Pressable>
    )

}

export default Gasto