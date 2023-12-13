import React, { useEffect,useState } from 'react'
import LiquidacionesLit from '../containers/liquidacioneslist';
import moment from 'moment/moment';
import TmsAPI from '../api/tms'

function LiquidacionesScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        gettoken()
       
    }, [])

    async function gettoken(){
        try {
            const token= await TmsAPI.get_token_liq()
            console.log(token.token)
            global.liqtoken=token
            getLiq(token.token)
            
        } catch (error) {
            
        }

    }

    async function getLiq(token){
        id_operador =global.id_operador
        var inicio=moment().add(6,'h').format('YYYY-MM-DDTHH:MM')
        var fin=moment().subtract(100, 'd').format('YYYY-MM-DDTHH:MM')
        var fromtime=fin+':00.000Z'
        var totime=inicio+':00.000Z'
        try {

            const data=await TmsAPI.getliquidations(id_operador,fromtime,totime,token)
            var liquidaciones=data.filter(data=> data.is_consolidated_row==false )
           // console.log(liquidaciones)
          
            setItems(liquidaciones)
 
        } catch (error) {
            console.log(error)
        }
      
    }

    
   
    return(
     <LiquidacionesLit liquidaciones={items}/>
    )
};
export default LiquidacionesScreen;