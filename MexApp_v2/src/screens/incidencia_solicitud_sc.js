import React, { useEffect, useState }from 'react';
import { Text, View} from 'react-native';
import StorageData from '../utils/storageData';
import IncidenciaList from '../containers/incidencias_scList';



function Incidencia_solicitud (){
    const [items, setItems] = useState([])



    useEffect(() => {
      getevi()
      
  
          return () => {
            setItems([])
          };
    
   }, [])



 

   const getevi = async() =>{
    try {
      const incidents=await StorageData.consultData('@incidents_saves')
      if(incidents!= null)
      {
        var convert=JSON.parse(incidents)
        console.log(convert.imaegenes)
        setItems(convert)
      }
      
    } catch (error) {
      
    }
 


}

  return(
      
    <View style={{width:'100%',height:'100%' }}>
   
      <Text style={{color:'#000000',textAlign:'center',fontWeight:'bold'}}>Incidencias con solicitud</Text>
      <IncidenciaList items={items}/>

    </View>
   )

};





export default Incidencia_solicitud;