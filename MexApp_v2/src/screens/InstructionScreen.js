import React , { useEffect, useState }from 'react';
import { Text,ScrollView, View} from 'react-native';
import tms from '../api/tms';
import InstrucctionList from '../containers/instructionList';


function Instrucction (props){
  const context=props.route.params
  console.log(context.id)
  const [items, setItems] = useState([])
  const [items1, setItems1] = useState([])
  const [items2, setItems2] = useState([])
  const [items3, setItems3] = useState([])
  const [enabezado,setencabezado]=useState([])


  useEffect(() => {
    getInst()


  },[])

  const getInst = async () => {
    const instrucctions= await tms.getInst(context.id)
   
    var validate =  instrucctions.status
    if (validate==200|| validate==202){
      const data = await instrucctions.json();
      var instrucction=data.instructions
      var datos=[]
      let carga=instrucction.filter(instrucction=> instrucction.type.alias=="CARGA" )
      let descarga=instrucction.filter(instrucction=> instrucction.type.alias=="DESCARGA" )
      let evidencia=instrucction.filter(instrucction=> instrucction.type.alias=="EVIDENCIA" )
      let ruta=instrucction.filter(instrucction=> instrucction.type.alias=="RUTA" ) 
      setItems(carga)
      setItems1(ruta)
      setItems2(evidencia)
      setItems3(descarga)

    }else{
      console.log('no hay conexion'+ validate)

    }
  

  }
 
  return(
    <ScrollView  style={{ flex: 1,
      width:'100%',
      height:'100%'
      }}>

        <InstrucctionList data={items}/>
        <InstrucctionList data={items1}/>
        <InstrucctionList data={items2}/>
        <InstrucctionList data={items3}/>
   

    </ScrollView>

   )

};

 

export default Instrucction;