import React, { useEffect,useState } from 'react'
import { View,Image,Pressable,Modal, ScrollView,RefreshControl,Text,StyleSheet} from 'react-native';
import ReporterList from '../containers/rerporterList';
import Api from'../api/tms'
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import storageData from '../utils/storageData';
import Maintenance from '../modals/new_mto_r';
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
      getData()
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
        const getreports= await tms.getreports(global.id_remolque, token)
        setItems(getreports)
       console.log(getreports)

      } catch (error) {
        
      }

    } 
   


    return(
      <View  style={{width:'100%',height:'100%' }}>
      <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
            <Modal
                animationType="slide"
                transparent={true}
                visible={helpmodal1}>
                <Maintenance 
                onRefresh={onRefresh}
                setHelpmodal1={setHelpmodal1}/>
            </Modal>
        <ReporterList data={items}/>
     
    </ScrollView>
    <View style={style.horizontal} >
            <Pressable onPress={openmodal}>

                <Image style={{width:50,height:50}} source={require('../drawables/mas.png')}/>
                <Text style={{marginBottom:20,color:'#000000'}}>Agregar</Text>

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