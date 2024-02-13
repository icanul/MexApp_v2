import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
   
}from 'react-native';
import Styles from '../styles/styles'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import operations from '../utils/operations';
function Empty (props){


  const[fecha,setfecha]=useState('')
  const[fechainit,setfechainit]=useState('')
  const[fechafin,setfechafin]=useState('')
 
  const [color,setcolor]=useState('#000000')
  const [status,setstatus]=useState('')



  useEffect(() => {

    var f=local(props.requested_on)
    var f2=local(props.approved_on)
    var f3=local(props.realized_on)
    setfecha(f) 
    setfechainit(f2) 
    setfechafin(f3) 
    var statuss=props.status_id
  

    switch (statuss){
      case 1:
          setstatus('SOLICITADO')
          setcolor('#FFDF00')
          break;
      case 2:
        setstatus('AUTORIZADO')
        setcolor('#006400')
          break;
      case 3:
          setstatus('DEPOSITADO')
          setcolor('#3AE1E1')
          break;
      case 4:
          setstatus('LIQUIDADO')
          setcolor('#A19DA8')
          break;
      case 5:
          setstatus('RECHAZADO')
          setcolor('#D23411')
          break;
          default:
            setstatus('sin status')

  }
  console.log(status)
  
   
}, [])

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
   const nombre=(name,app,apm)=>{
     var nombre=name.trim()
     var apps=app.trim()
     var apms=apm.trim()
     var completo=nombre+' '+apps+' '+apms
    
     return  completo


   }


    return(
<Pressable style={Styles.contencard}>
  <View style={{borderColor:'#000000'}}>

  
  <Text style={{color:color, textAlign:'right',marginTop:10}}>{props.status} </Text>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Importe.</Text>
    <Text style={Styles.simpletext}>{props.amount} $</Text>
    <Text style={Styles.titletext}>Fecha:</Text>
    <Text style={Styles.simpletext}>{operations.fechaFormateada(props.requested_on)}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Comentario</Text>
    <Text style={Styles.simpletext}>{props.comment}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Autorizado</Text>
    <Text style={Styles.simpletext}>{operations.fechaFormateada(props.approved_on)}</Text>
  </View>
  <Text style={Styles.simpletextm}>{props.approved_by}</Text>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Aplicado</Text>
    <Text style={Styles.simpletext}>{operations.fechaFormateada(props.realized_on)}</Text>
  </View>
  <Text style={[Styles.simpletextm,{marginBottom:10,}]}>{props.realized_by}</Text>

</View>
</Pressable>
    )

}

export default Empty