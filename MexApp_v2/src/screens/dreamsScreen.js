import { set } from 'immer/dist/internal';
import React, { useState,useEffect } from 'react';
import { View,Text,Pressable,StyleSheet,RefreshControl,Modal,Alert} from 'react-native';
import Api from '../api/intranet'
import NewDream from '../modals/newdream';
import SetDreams from '../modals/setDream'
import DinamicImage from '../componets/dinamicImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import Style from '../styles/styles';
import DreamLIist from '../containers/deams_list';

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

    const datatest=[
    {'id':1,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':2,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':3,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':4,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':5,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':6,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':7,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':8,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':9,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':10,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':11,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':13,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':14,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':15,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':16,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    {'id':17,'event':'SUEÑO','fhi':'12/02/2023 12:00','fhf':'12/02/2023 12:00'},
    ]

    useEffect(() => {
      // Suscribirse a los cambios en la conexión a Internet         setIsConnected(state.isConnected);

      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
        var stade_conection=state.isConnected
        if(stade_conection==true){
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
      getDreams()

      wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }



    const validate_dream_off =async()=>{
     

  var recovery = await getsaveDreamas()
  if(recovery!= null){

    if(recovery.end==''&&recovery.start!=''){
      setStateDream('Terminar Sueño')
      setBanderabutton('#e62e1b')
      setBanderadrems(1)
     
      

    }else{
      setStateDream('Iniciar Sueño 7')
      Alert.alert("finalizado sin conexion")
      setBanderabutton('#008f39')
      setBanderadrems(2)
    

      if(recovery.startStatus==false&&recovery.endStatus==false){ 
        try {
          console.log("se agregara al servicio posterior")

          const dreams=await Api.New_Dream(recovery.start,recovery.end)
          console.log(dreams)
          Alert.alert("se agrego unsueño sin conexion")
          await AsyncStorage.removeItem("@dreams_current");     
          onRefresh()

        } catch (error) {
          console.log(error)
        }
     
      }else if(recovery.startStatus=true&& recovery.endStatus==false){
        try {
          console.log("se agregara al servicio normal")
          const stardream=await Api. setDream("",recovery.snd,recovery.id,"finalizar MexApp2",false)
          console.log(stardream)
          Alert.alert("se agrego unsueño sin conexion")
          await AsyncStorage.removeItem("@dreams_current");
          onRefresh()

        } catch (error) {
          console.log(error)
          
        }
      }
    }

  }}



    async function getDreams(){
       var id_operador =global.id_operador

        try {

            const dreams=await Api.get_current_dream(id_operador)
            console.log(dreams)
            setBanderadrems(dreams.activity_id)
            setData(dreams)
            storeData(dreams)
            var semaphore=dreams.semaphore_24
      var activity_id=dreams.activity_id
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
          validate_dream_off()
           
            
        } catch (error) {
            dataOffline()
        }

    }
    const storeData = async (value) => {
        try {
           
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@dreams_storage', jsonValue)
        } catch (e) {
          console.log(e)
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
            
           
         console.log(e)
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
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
     <NewDream 
     modalVisible={modalVisible} 
     onRefresh={onRefresh}
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
          banderadreams={banderadreams}/>


      </Modal>

         
            <DinamicImage bandera={data.activity_id} banderadreams={banderadreams} />


            </View>
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
            <Text style={{fontWeight:'bold', marginLeft:10, marginTop:10 }}>Ultimos sueños</Text>
           
            <DreamLIist style={{marginTop:20}} items={datatest}/>

           
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