import React, { useEffect,useState } from 'react'
import { Alert } from 'react-native';
import { View,Text ,StyleSheet,Image,Linking,ScrollView,RefreshControl} from 'react-native';
import Api from'../api/intranet'
import Maps from '../componets/maps';
import ConfirmatedImage from '../componets/conformadImage';
import CPicked from '../modals/confirmarcarga';
import Cdelivery from '../modals/confirmardescarga'
import { Pressable,Modal } from 'react-native';
import Confirmated from '../modals/confirmacion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/styles'


function TravelsScreen (props){
    const navigation = useNavigation();
    const [isload,setIsload]= useState(1)
    const [travel_current,set_travel_current]=useState([])
    const [origen,setOrigen]=useState('')
    const [modalVpicked, setMpicked] = useState(false);
    const [modaldelivery, setMdeliveri] = useState(false);
    const [modalconfirmated, setConfimated] = useState(false);
    const [isOffline, setIsoffline]=useState('')
    const [refreshing, setRefreshing] = React.useState(false);
    const [solicitudcolor,setSolicitudcolor]= useState('#ffffffcc')
    const [cargacolor,setCargacolor]= useState('#ffffffcc')
    const [descargacolor,setDescargacolor]= useState('#ffffffcc')
    const [message,setMessage]=useState('Cargando viaje actual...')
    const [bandera_c1,setBandera_c1]=useState(false)
    const [bandera_c2,setBandera_c2]=useState(false)
    const [bandera_c3,setBandera_c3]=useState(false)



    useEffect(() => {
     
            gettravel()
     
          return () =>{
       
            set_travel_current([])
          } 
    }, [])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        gettravel()

        wait(2000).then(() => setRefreshing(false));
      }, []);
      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const validate_offline= async () => {

        const jsonValue = await AsyncStorage.getItem('@confirmarsolicitud')       
        if(jsonValue != null){
            var convert=JSON.parse(jsonValue)
            Confirmar(jsonValue)
            var convert=JSON.parse(convert)
            setBandera_c1(true)
            setConfimated(false)

            setSolicitudcolor('#ffffffcc')



        }
        const jsonValue2 = await AsyncStorage.getItem('@confirmarcarga')
        if(jsonValue2 != null){
            var convert=JSON.parse(jsonValue2)
            console.log('hay confirmacion de carga pendiente')
            Confirmar(convert)
            bandera_c2(true)
            setCargacolor('#ffffffcc')



        }
        const jsonValue3 = await AsyncStorage.getItem('@confirmardescarga')
        if(jsonValue3 != null){
            var convert=JSON.parse(jsonValue3)
            console.log('hay confirmacion de descarga pendiente')
            Confirmar(convert)
            setBandera_c3(true)
            setDescargacolor('#9b9b9bcc') 

        }


    }
    const getCP=()=>{
        console.log('carta porte'+travel_current.cfdi)
        if(travel_current.cfdi==""||travel_current.cfdi==null){
            console.log("no hay carta porte, se abrira")
            navigation.navigate('pdf',{sol:travel_current.id})

        }else{
            console.log(travel_current.cfdi)
            navigation.navigate('cartaporte',{id:travel_current.cfdi})

        }
       
      }
      const inst=()=>{
        navigation.navigate('instrucciones',{id:travel_current.id})
      }
 
    async function gettravel(){
        console.log('buscando viaje actual')
        id_operador =global.id_operador
        try {
            const travel=await Api.getCurrentravel(id_operador)
            var currenttravel=travel[0]
            //console.log(currenttravel)
            storeData(currenttravel)
            setIsoffline('')

            global.vehicle_id=currenttravel.vehicle_id
            global.origen=currenttravel.origin
            global.destino=currenttravel.destiny
            global.solicitud=currenttravel.id
            global.vehicle_carga=currenttravel.vehicle_carga
            global.id_remolque=currenttravel.id_remolque

            if(currenttravel.travel_confirmed==false){
                setConfimated(true)
            }          
            set_travel_current(currenttravel)
            setBandera_c1(currenttravel.travel_confirmed)
            setBandera_c2(currenttravel.pickup_confirmed)
            setBandera_c3(currenttravel.delivery_confirmed)
            setOrigen(currenttravel.origin)

            if(currenttravel.travel_confirmed=true&&currenttravel.pickup_confirmed==false&&currenttravel.delivery_confirmed==false){
                setSolicitudcolor('#ffffffcc')
                setCargacolor('#9b9b9bcc')
                setDescargacolor('#9b9b9bcc')
            }else if(currenttravel.travel_confirmed=true&&currenttravel.pickup_confirmed==true&&currenttravel.delivery_confirmed==false){
                setSolicitudcolor('#ffffffcc')
                setCargacolor('#ffffffcc')
                setDescargacolor('#9b9b9bcc') 
            }else if(currenttravel.travel_confirmed=true&&currenttravel.pickup_confirmed==true&&currenttravel.delivery_confirmed==true){
                setSolicitudcolor('#ffffffcc')
                setCargacolor('#ffffffcc')
                setDescargacolor('#ffffffcc')
            }
            try {
                validate_offline()

                
            } catch (error) {
                console.log(error)
                
            }
            setIsload(0)

        } catch (error) {
            validate_offline()
            dataOffline()
        }
    }
    async function Confirmar(confirmation){
  
        try {
            const confirmated=await Api.confirmar(confirmation.solicitud,confirmation.id,confirmation.observation,confirmation.datetime)
            console.log(confirmated)
            var id=confirmation.id
            switch(id){
                case 1:
                    await AsyncStorage.removeItem("@confirmarsolicitud");   
                case 2:
                    await AsyncStorage.removeItem("@confirmarcarga");     
                
                case 3:
                    await AsyncStorage.removeItem("@confirmardescarga");     
                case -1:
                    await AsyncStorage.removeItem("@confirmarcarga");     

            }

        } catch (error) {
            console.log(error)
           
            }      
            
        }
    
    const storeData = async (value) => {
        try {
           
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@travelCurrent_storage', jsonValue)
          
        } catch (e) {
          console.log(e)
        }
      }
      const dataOffline = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@travelCurrent_storage')
          if(jsonValue != null){
            var convert=JSON.parse(jsonValue)
            set_travel_current(convert)
            //console.log(travel_current.id)
            setIsoffline('no hay conexion a internet')
            setIsload(0)
            validate_offline()

          }
          else{
              setMessage('No hay viaje actual')
          }
         
         
          
        } catch(e) {
            setMessage('No hay viaje actual xd')
         //console.log(e)
        }
      }

    if(isload==1){
        return(
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}> 
                <Text style={Styles.simpletext}>{message}</Text>

            </View>
        )

    }
    else{
        return(
            <View style={{flex:1,}} >
          
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVpicked}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVpicked);
               }}>
                <CPicked solicitud= {travel_current.id} modalVisible={modalVpicked}  setModalVisible={setMpicked}  onRefresh={onRefresh}/>
                </Modal>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalconfirmated}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalconfirmated);
               }}>
                <Confirmated solicitud= {travel_current.id} modalVisible={modalconfirmated} setModalVisible={setConfimated} onRefresh={onRefresh}/>
                </Modal>

                <Modal
                animationType="slide"
                transparent={true}
                visible={modaldelivery}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modaldelivery);
               }}>
                <Cdelivery solicitud= {travel_current.id} modalVisible={modaldelivery} setModalVisible={setMdeliveri}  onRefresh={onRefresh}/>
                </Modal> 
            
                < Maps  
                lto={travel_current.lat_origin} 
                lno={travel_current.lon_origin}
                ltd={travel_current.lat_destiny}
                lnd={travel_current.lon_destiny}
                origen={origen}
                destino={travel_current.destiny}
                solicitud={travel_current.id}
                points={travel_current.waypoints_origin}/>
               
    
                <ScrollView style={{margin:4}} refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }>
             
                        <Text style={style.textbutton}> {travel_current.agreement}</Text>
                       
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={Styles.titletext}>Shipment: </Text>
                           <Text  style={Styles.simpletext}>{travel_current.shipment} </Text>
                           <Text  style={Styles.titletext}>Unidad: </Text>
                           <Text  style={Styles.simpletext}>{global.alias}  </Text>
    
                        </View>
                        <View  visible={false} style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={Styles.titletext}>Carta Porte: </Text>
                           <Text  style={Styles.simpletext}>{travel_current.pro_number} </Text>
                           <Text  style={Styles.titletext}>Remolque: </Text>
                           <Text  style={Styles.simpletext}>{global.alias}  </Text>
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={Styles.titletext}>Cliente: </Text>
                           <Text  style={Styles.simpletext}>{travel_current.client} </Text>
                           <Text  style={Styles.titletext}>Solicitud: </Text>
                           <Text  style={Styles.simpletext}>{travel_current.id}  </Text>   
                        </View>
    
    
                        <Text style={style.textbutton}> Asignacion de solicitud</Text>
                        <Pressable 
                            onPress={() => setConfimated(true)} style={[style.button,{backgroundColor:solicitudcolor}]}>
                            <Text style={Styles.simpletext}>Confirmacion de solicitud</Text>
                            <ConfirmatedImage confirmated={bandera_c1} />
                        </Pressable>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                            <Text style={style.text3}>Direccion origen:  </Text>
                            <Text style={style.text4}>{travel_current.origin_address} </Text>
    
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                            <Text style={style.text3}>Cita de carga:  </Text>
                            <Text style={style.text4}> {travel_current.pickup_datetime} </Text>
    
                        </View>
                        <Pressable 
                            onPress={inst} style={[style.button,{backgroundColor:solicitudcolor}]}>
                            <Text style={Styles.simpletext}>Instrucciones de viaje</Text>
                        </Pressable>
                        <Text style={style.textbutton}>Llegada origen: {origen}</Text>
                        <Pressable 
                        onPress={getCP}
                         style={[style.button,{backgroundColor:cargacolor}]
                    }>
                            <Text style={Styles.simpletext}>VER Carta Porte</Text>
                            <Image source={require('../drawables/pdfattt.png')} style={style.logotel} />
                        </Pressable>
                        <Pressable 
                        onPress={() => setMpicked(true)}
                        style={[style.button,{backgroundColor:cargacolor}]}>
                            <Text style={Styles.simpletext}>confirmar carga  </Text>
                            <ConfirmatedImage confirmated={bandera_c2} />
    
    
                        </Pressable>
                        <View  style={[style.horizontal,{backgroundColor:cargacolor}]}>
                            <Text style={style.text3}>Direccion Destino:  </Text>
                            <Text style={style.text4}>{travel_current.destiny_address}  </Text>
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:cargacolor}]}>
                            <Text style={style.text3}>Cita de descarga:  </Text>
                            <Text style={style.text4}>{travel_current.delivery_datetime}</Text>
                        </View>
                        <Text style={style.textbutton}>Llegada Destino{travel_current.destiny} </Text>
                        <Pressable
                        onPress={() => setMdeliveri(true)}  
                        style={[style.button,{backgroundColor:cargacolor}]}>
                            <Text style={Styles.simpletext}>confirmar Descarga  </Text>
                            <ConfirmatedImage confirmated={bandera_c3} />
                        </Pressable>
                        <Text style={style.textbutton}>Salida Destino</Text>
                        <Pressable  style={[style.button,{backgroundColor:descargacolor}]}
                         onPress={() => Linking.openURL('tel:+52'+global.phone)}>
                            <Text style={Styles.simpletext}>Llamar lider de flota  </Text>
                            <Image source={require('../drawables/call.png')} style={style.logotel} />
    
    
                        </Pressable>
                   
    
                </ScrollView>

            </View>
    
        )

    }

 
/*/ /*/

   
    

};

const style=StyleSheet.create({
    logo:{
        width:65,
        height:85,
        resizeMode:'contain',
    },
    logotel:{
        width:35,
        height:35,
        resizeMode:'contain',
    },
    title:{
        color:'center',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    button: {
        flexDirection:'row',
        alignItems: 'center',
        borderRadius: 360,
        elevation:6,
        backgroundColor:'#fff',
        justifyContent: 'center',
        margin:5,      
    
      },
      name:{
          marginLeft:10,

      },
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,

      },
      
      textbutton:{
        flex:1,
        fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.25,
    backgroundColor:'#cca028',
    color: '#ffffff',

    },
    menuicon:{
        width:40,
        height:40,
        margin: 5,
        resizeMode:'contain',
    },
   
  
    horizontal:{
       width:'100%',
       flex:1,
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
        borderRadius: 4,
        elevation: 3,
        marginBottom:5,

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

    },
    text:{
        width:"25%"
    },
    text1:{
        width:"25%",
        fontWeight: 'bold',

    },
    text3:{
        width:"25%",
        fontWeight: 'bold',
        color:'#000000',
        margin:5


    },
    text4:{
        width:"75%",
        color:'#000000',
        margin:5

    }
    
  
  })
export default TravelsScreen;