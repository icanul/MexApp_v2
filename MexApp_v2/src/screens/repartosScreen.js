import React, { useEffect,useState } from 'react'
import RepartosList from '../containers/repartosList';
import moment from 'moment/moment';
import TmsAPI from '../api/tms'

function RepartosScreen (props){
    const [items, setItems] = useState([]);
    const context=props.route.params


    useEffect(() => {
        getdata()
       
    }, [])

  

    async function getdata(){
        console.log('buscando repartos de la solicitud:::::'+context.id)
      
        try {

            const repartos=await TmsAPI.getRepartos(context.id)
            const data = await repartos.json();
            console.log(data)
            setItems(data.intermediate_points)
 
        } catch (error) {
            console.log(error)
        }
      
    }   
   
    return(
     <RepartosList items={items}/>
    )
};
export default RepartosScreen;