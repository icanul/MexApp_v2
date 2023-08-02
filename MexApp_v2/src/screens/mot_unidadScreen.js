import React, { useEffect,useState } from 'react'
import { View,Image,Pressable,Modal, ScrollView,RefreshControl,StyleSheet,Text} from 'react-native';
import ReporterList from '../containers/rerporterList';
import Api from'../api/tms'
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import storageData from '../utils/storageData';
import Maintenance from '../modals/new_mto';
import tms from '../api/tms';




function ReporterScreen (){
    const [items, setItems] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [helpmodal1,setHelpmodal1]=useState(false)
   



    useEffect(() => {
      getData()
       
    }, [])

    const openmodal=()=>{
      setHelpmodal1(true)
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
      getGastos()
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    async function getData(){
      const gettoken= await tms.gettoken()
      var token=gettoken.token 
      global.token=token
      try {
        const getreports= await tms.getreports(global.vehicle_id,token)
        setItems(getreports)
       console.log(getreports[0])

      } catch (error) {
        
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
      <View style={{width:'100%',height:'100%' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={helpmodal1}>
                <Maintenance setHelpmodal1={setHelpmodal1}/>
            </Modal>
        <ReporterList data={items}/>
        <View style={style.horizontal} >
            <Pressable onPress={openmodal}>
            <Image style={{width:50,height:50}} source={require('../drawables/mas.png')}/>
                <Text style={{marginBottom:20}}>Agregar</Text>
            </Pressable>
        </View>
    </View>
    )
};

const style = StyleSheet.create({
  button:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'blue',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
  button1:{
    width:100,
    height:100,
    alignContent:'center',
    alignContent:'center',
    justifyContent: 'center',
    backgroundColor:'green',
    margin:5,
    borderRadius:360,marginTop:10,elevation: 5
    

},
textbutton:{
      color:'#ffffff',
      textAlign: 'center'
  },
  horizontal:{
   
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',//use absolute position to show button on top of the map
  
   
      alignSelf: 'flex-end' ,
      top: '88%'//for align to right
     
   

  },

})
export default ReporterScreen;