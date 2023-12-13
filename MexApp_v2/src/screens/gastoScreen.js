import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert, ScrollView,RefreshControl} from 'react-native';
import GastosList from '../containers/gastoslist';
import Api from'../api/tms'
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import storageData from '../utils/storageData';




function DepositosScreen (){
    const [items, setItems] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);


    useEffect(() => {
      gettoken()
       
    }, [])

    async function gettoken(){
      try {
          const token= await Api.get_token_liq()
          console.log(token.token)
          global.liqtoken=token
          getGastos(token.token)
          
      } catch (error) {
          
      }

  }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        gettoken()
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    async function getGastos(token){
      var inicio=moment().add(6,'h').format('YYYY-MM-DDTHH:MM')
      var fin=moment().subtract(100, 'd').format('YYYY-MM-DDTHH:MM')
      var fromtime=fin+':00.000Z'
      var totime=inicio+':00.000Z'
        try {

            const getdepositos=await Api.getgasto(id_operador,fromtime,totime,token)
          //  console.log(getdepositos)
         
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )
          function cambiarValor(valorABuscar, valorViejo, valorNuevo) {
            convert.forEach(function (elemento) { // recorremos el array     
               //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
              elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
            })
          }
          cambiarValor("status_id", 3, -3)
          let a= convert.sort(GetSortOrder("status_id"));
          setItems(a)
           const save = await storageData.insertData('@gasto',a)
        
 
        } catch (error) {
           const save = await storageData.consultData('@gasto')
           if(save != null){
            var convert=JSON.parse(save)
            setItems(convert)

           }
            console.log(error)
        }
    
    }
  

    function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  
   
    return(
        <ScrollView 
        
        style={{flex:1, width:'100%',height:'100%'}}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
            <GastosList  depositos={items}/>
     </ScrollView>
    )
};
export default DepositosScreen;