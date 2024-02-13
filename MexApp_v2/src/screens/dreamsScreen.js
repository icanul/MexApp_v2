import { set } from 'immer/dist/internal';
import React, { useState,useEffect } from 'react';
import { View,Text,Pressable,StyleSheet,RefreshControl,Modal,Alert,ScrollView} from 'react-native';
import Api from '../api/intranet'
import NewDream from '../modals/newdream';
import SetDreams from '../modals/setDream'
import DinamicImage from '../componets/dinamicImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Style from '../styles/styles';
import DreamLIist from '../containers/deams_list';
import { LogBox } from 'react-native';

function DreamsScreen (props){
  const context=props
  const [isConnected, setIsConnected] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
    const [bandera,setBandera]=useState('#eaeaea')
    const [banderadreams, setBanderadrems]=useState(0)
    const [banderabutton, setBanderabutton]=useState('#008f39')
    const [stateDream, setStateDream]=useState('iniciar sueño')
    const [data,setData]=useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [isOffline, setIsoffline]=useState('')
    const [savestart, setSavestart]=useState('')
    const [save_end,setSave_end]=useState('')
    const [savebandera,setSavebandera]=useState('')
    const [listdreams,setdreams]=useState([]);
    const [dreams_off,setDreamOff]=useState('')


    useEffect(() => {
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
     

      const unsubscribe = NetInfo.addEventListener(state => {
        var stade_conection=state.isConnected
        var isInternetReachable=state.isInternetReachable
        if(stade_conection==true&&isInternetReachable==true){
          setIsConnected(true);

          getDreams()

        }else{
          dataOffline()
         
        }
      });
  
      // Desuscribirse cuando el componente se desmonte
      return () => {
        unsubscribe();
      };
    }, []);


    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      if(isConnected){
        getDreams()

      }else{
        dataOffline()
      }

      wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }



    const validate_dream_off =async()=>{
     

  var recovery = await getsaveDreamas()
  if(recovery!= null){
    console.log('hay un sueño pendientes ')
   
    if(recovery.end==''&&recovery.start!=''){
      setStateDream('Terminar Sueño')
      setDreamOff('Iniciaste un sueño sin conexion se enviara cuando se lo finalices')
      setBanderabutton('#e62e1b')
      setBanderadrems(1)
     
      

    }else{
      setStateDream('Iniciar Sueño')
      setDreamOff('Tienes un sueño pendiente por enviar se enviara cuando tengas conexion')
      setBanderabutton('#008f39')
      setBanderadrems(2)
      if(isConnected){
        if(recovery.startStatus==false&&recovery.endStatus==false){ 
          try {
         console.log("se agregara al servicio posterior")
  
            const dreams=await Api.New_Dream(recovery.start,recovery.end)
            console.log(dreams)
            Alert.alert("","Se agrego Un sueño sin conexion")
            await AsyncStorage.removeItem("@dreams_current"); 
            setDreamOff('')    
            onRefresh()
  
          } catch (error) {
            console.log(error)
            setDreamOff('')    
            onRefresh()
          }
       
        }else if(recovery.startStatus=true&& recovery.endStatus==false){
          try {
            console.log("se agregara al servicio normal no mmes")
            const stardream=await Api. setDream("",recovery.end,recovery.id,"finalizar MexApp2",false)
            //console.log(stardream)
            setDreamOff('')
            Alert.alert("",stardream)
            await AsyncStorage.removeItem("@dreams_current");
            onRefresh()
  
          } catch (error) {
            console.log(error)
            onRefresh()
            
          }
        }

      }
    

      
    }

  }else{
    console.log('no hay sueño guardado')
    setDreamOff('')
  }
}



    async function getDreams(){
       var id_operador =global.id_operador
       //console.log(' servicio'+id_operador)
       try {
        const dreams=await Api.get_current_dream(id_operador)
        setdreams(dreams.listevents)
        props.setConected(require('../drawables/online.png'))
        setBanderadrems(dreams.activity_id)
        setData(dreams)
        storeData(dreams)
        var semaphore=dreams.semaphore_24
        var activity_id=dreams.activity_id
        if(activity_id==1)
        {
          setStateDream('Terminar Sueño')
          setBanderabutton('#e62e1b')

        }
        else{
          setStateDream('Iniciar Sueño')
          setBanderabutton('#008f39')

        }
        if(semaphore==3){
            setBandera('#e62e1b')

        }else if(semaphore==2){
            setBandera('#fce903')

        }else if(semaphore==1){
            setBandera('#008f39')         
        }
            validate_dream_off()
           
            
      } catch (error) {
        Alert.alert("",'Error al conectarse al servidor','MexApp guardara toda la información mientras se restablece la conexión')
          props.setConected(require('../drawables/offline2.png'))
          dataOffline()
        }

    }

    const storeData = async (value) => {
        try {
           
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@dreams_storage', jsonValue)
        } catch (e) {
         // console.log(e)
        }
      }
      const dataOffline = async () => {
  
        try {
          const jsonValue = await AsyncStorage.getItem('@dreams_storage')
          if(jsonValue!=null){
            var convert=JSON.parse(jsonValue)
            setData(convert)
            var activity_id=convert.activity_id
            var semaphore=convert.semaphore_24
            setBanderadrems(convert.activity_id)

            if(activity_id==1){
              setStateDream('Terminar Sueño')
              setBanderabutton('#e62e1b')
      
            }else{
              setStateDream('Iniciar Sueño')
              setBanderabutton('#008f39')
      
            }
            if(semaphore==3){
                setBandera('#e62e1b')
      
            }else if(semaphore==2){
                setBandera('#fce903')
      
            }else if(semaphore==1){
                setBandera('#008f39')         
            }

          }
          validate_dream_off()
         
      
        } catch(e) {
            
           
       //  console.log(e)
        }
      }
      const getsaveDreamas = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@dreams_current')
          var convert=JSON.parse(jsonValue)
          return convert
          
        } catch(e) {

       return ""
         
        }
      }



    return(
        
        
        <ScrollView 
        style={{width:'100%', height:'100%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        
            <View style={style.horizontal}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("","Operación cancelada");
          setModalVisible(!modalVisible);
        }}
      >
     <NewDream 
     modalVisible={modalVisible} 
     onRefresh={onRefresh}
     isConnected={isConnected}
     setModalVisible={setModalVisible}/>

      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible(!modalVisible1);
        }}>

          <SetDreams 
          modalVisible1={modalVisible1} 
          bandera={banderadreams}  
          setModalVisible1={setModalVisible1} 
          savestart={savestart}
          save_end={save_end}
          savebandera={savebandera}
          onRefresh={onRefresh}
          id_dream={data.id}
          isConnected={isConnected}
          banderadreams={banderadreams}/>


      </Modal>

         
            <DinamicImage bandera={data.activity_id} banderadreams={banderadreams} />


            </View>
            <Text style={{fontWeight:'bold', marginLeft:10, marginTop:5,marginBottom:5,justifyContent:'center',textAlign:'center' }}> {dreams_off}</Text>

            <View style={{backgroundColor:bandera,marginTop:5,margin:10}}>
                <Text style={[{backgroundColor:bandera},style.textbutton]}>Tienes que dormir antes del {data.dream_24}</Text>
            </View>
            
            <View style={Style.hcentrar}>
            <Pressable style={{backgroundColor:banderabutton,borderRadius:60,marginTop:10,marginRight:5, elevation: 5,}}
            onPress={() => setModalVisible1(true)}>
                <Text style={{color:'#ffffff',textAlign: 'center',margin:10, letterSpacing: 0.25,}}>{stateDream}</Text>
            </Pressable>
            <Pressable style={{backgroundColor:'blue',borderRadius:60,marginTop:10,elevation: 5}}
              onPress={() => setModalVisible(true)}>
                <Text style={{color:'#ffffff',textAlign: 'center',margin:10}}a>Agregar sueño</Text>
            </Pressable>

            </View>
           <Text style={{fontWeight:'bold', marginLeft:10, marginTop:20,marginBottom:15,justifyContent:'center',textAlign:'center' }}>Ultimos sueños</Text>
           <DreamLIist style={{marginTop:20}} items={listdreams}/>

           

           
        </ScrollView>

    )

};
const style=StyleSheet.create({
    logo:{
        width:150,
        height:150,
        borderRadius: 360,
        marginTop:10,
    },

  
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      
    
      },
      titulo:{
        flex:1,
        fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.25,
    color: '#ffffff',

      },
      
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,

      },
      textbutton:{
        textAlign: 'center',
        color: '#ffffff',
        margin:5,
        fontSize:15

    },
    menuicon:{
        width:'100%',
        height:'100%',
        margin: 5,
        resizeMode:'contain',
    },
   
  
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
       
     

    },
    horizontal1:{
      
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
    alignItems: 'center',
       
     

    },
    menuitems:{
       
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        margin:5,
    },
    vertical:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    }
  
  })
export default DreamsScreen;