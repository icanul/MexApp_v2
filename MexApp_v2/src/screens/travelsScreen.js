import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import Travelslist from '../containers/travelslist';
import Api from'../api/intranet'




function TravelsScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        console.log('buscando props')
        gettravel()
       
    }, [])

    async function gettravel(){
        id_operador =global.id_operador
        try {

            const gettravel=await Api.gettravels(id_operador)
            var currenttravel=gettravel
            setItems(currenttravel)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
     <Travelslist travels={items}/>
    )
};
export default TravelsScreen;