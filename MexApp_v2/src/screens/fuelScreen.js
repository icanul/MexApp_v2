import React , { useEffect, useState }from 'react';
import { Text,ScrollView, RefreshControl} from 'react-native';
import tms from '../api/tms';
import FuelList from '../containers/fuelsList'

function FuelScreen (props){
 
  const [items, setItems] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);


  useEffect(() => {
    getfuels()


  },[])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getfuels()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const getfuels = async () => {
    const fuels= await tms.getfuel(global.id_operador)
    var validate =  fuels.status
    if (validate==200|| validate==20|| validate==206){
      const data = await fuels.json();
      let convert=data.filter(data=> data.is_consolidated_row==false )
      setItems(convert)
    }else{
      console.log('no hay conexion'+ validate)
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
        <FuelList  onRefresh={onRefresh} items={items}/>
 </ScrollView>

   )

};

 

export default FuelScreen;