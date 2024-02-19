import React, { useEffect,useState } from 'react'
import { Alert, Touchable, TurboModuleRegistry } from 'react-native';
import { View,Text ,StyleSheet,Image,Linking,ScrollView,RefreshControl,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import Api from'../api/intranet'
import Maps from '../componets/maps';
import messaging from '@react-native-firebase/messaging';
import ConfirmatedImage from '../componets/conformadImage';
import CPicked from '../modals/confirmarcarga';
import Cdelivery from '../modals/confirmardescarga'
import { Pressable,Modal } from 'react-native';
import Confirmated from '../modals/confirmacion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/styles'
import operations from '../utils/operations';



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
    const [solicitudcolor1,setSolicitudcolor1]= useState('#cb3234cc')
    const [cargacolor,setCargacolor]= useState('#ffffffcc')
    const [cargacolor1,setCargacolor1]= useState('#cb3234')
    const [descargacolor,setDescargacolor]= useState('#ffffffcc')
    const [descargacolor1,setDescargacolor1]= useState('#cb3234')
    const [message,setMessage]=useState('Cargando viaje actual...')
    const [bandera_c1,setBandera_c1]=useState(false)
    const [bandera_c2,setBandera_c2]=useState(false)
    const [bandera_c3,setBandera_c3]=useState(false)
    const [isConnected, setIsConnected] = useState(false);
    const [status_cs,setstatus_cs]= useState('')
    const [status_cc,setstatus_cc]= useState('')
    const [status_cd,setstatus_cd]= useState('')
    const [travel_confirmed_date,settravel_confirmed_date]=useState('')
    const [pickup_confirmed_date,setpickup_confirmed_date]=useState('')
    const [delivery_confirmed_date,setdelivery_confirmed_date]=useState('')





    useEffect(() => {
        
        const unsubscribe = NetInfo.addEventListener(state => {
            var stade_conection=state.isConnected  
            var isInternetReachable=state.isInternetReachable
            var strength=state.details.strength
            if(stade_conection==true&&isInternetReachable==true){
                console.log('buscando viaje con conexion a internet')
              setIsConnected(true);
              gettravel()

            }
            else{
                console.log('buscando viaje sin estable conexion a internet')
                dataOffline(false)
                setIsConnected(false);
            }
        })
     
          return () =>{    
            unsubscribe();
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

    const validate_offline= async (bandera) => {


        const jsonValue = await AsyncStorage.getItem('@confirmarsolicitud')       
        if(jsonValue != null){
            Alert.alert('Confirmación pendiente','')
            setstatus_cs('pendiente')
            var convert=JSON.parse(jsonValue)
            console.log(convert)
            setBandera_c1(true)
            setConfimated(false)
            setSolicitudcolor('#ffffffcc')
            setSolicitudcolor1('#008f39cc')
            settravel_confirmed_date(convert.datetime)
            if(bandera){
                Confirmar(jsonValue)
            }
        //    Alert.alert('Confirmacion de solicitud','Se ha confirmado tu solicitud guardada')

        }
        const jsonValue2 = await AsyncStorage.getItem('@confirmarcarga')
        if(jsonValue2 != null){
            Alert.alert('Confirmación pendiente','')
            setstatus_cc('pendiente')
            var convert=JSON.parse(jsonValue2)
            setBandera_c2(true)
            setCargacolor('#ffffffcc')
            setCargacolor1('#008f39cc')
            console.log('entrandoi a validacion'+bandera)
            setpickup_confirmed_date(convert.datetime)
            if(bandera){
              
                Confirmar(jsonValue2)

            }
         ///   Alert.alert('Confirmación de carga','Se ha confirmado tu carga guardada')

        }
        const jsonValue3 = await AsyncStorage.getItem('@confirmardescarga')
        if(jsonValue3 != null){
            Alert.alert('Confirmación pendiente','')
            setstatus_cd('pendiente')
            var convert=JSON.parse(jsonValue3)
            if(bandera){
                
                 Confirmar(jsonValue3)

            }
            setBandera_c3(true)
            setDescargacolor('#9b9b9bcc') 
            setDescargacolor1('#008f39cc')
            setdelivery_confirmed_date(convert.datetime)
     ///       Alert.alert('Confirmación de descarga','Se ha confirmado tu descarga guardada')
        }
        const tmsreport = await AsyncStorage.getItem('tmsnotification')
        if(tmsreport != null){
            console.log(tmsreport)
           // Alert.alert('Confirmación de descarga','Se ha confirmado tu descarga guardada')
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
      const repartos=()=>{
        navigation.navigate('Repartos',{id:travel_current.id})
      }
 
    async function gettravel(){
        console.log('buscando viaje actual')
        id_operador =global.id_operador
        try {
            console.log(id_operador)
            const travel=await Api.getCurrentravel(id_operador)
            var currenttravel=travel[0]
            if(currenttravel.pickup_confirmed){
                setstatus_cc('Enviada')
                setCargacolor1('#008f39cc')
            }
            if(currenttravel.delivery_confirmed){
                setstatus_cd('Enviada')
                setDescargacolor1('#008f39cc')
            }
            if(currenttravel.travel_confirmed){
                setstatus_cs('Enviada')
                setSolicitudcolor1('#008f39cc')

            }
            settravel_confirmed_date(currenttravel.travel_confirmed_date)
            setpickup_confirmed_date(currenttravel.pickup_confirmed_date)
            setdelivery_confirmed_date(currenttravel.delivery_confirmed_date)
            storeData(currenttravel)
            setIsoffline('')
            global.vehicle_id=currenttravel.vehicle_id
            global.origen=currenttravel.origin
            global.destino=currenttravel.destiny
            global.solicitud=currenttravel.id
            global.vehicle_carga=currenttravel.vehicle_carga
            global.id_remolque=currenttravel.id_remolque
            try {
                console.log('surcribiendo a topic::::::::::')
                messaging()
                .subscribeToTopic(currenttravel.id+"")
                .then(() => console.log('Subscribed to topic!'+currenttravel.id));  
                
            } catch (error) {
                console.log('Error::::::::::'+error)
                
            }

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
                validate_offline(true)

                
            } catch (error) {
                console.log(error)
                
            }
            setIsload(0)

        } catch (error) {
            validate_offline()
            dataOffline()
        }
    }
    async function Confirmar(body){
        var data= JSON.parse(body)
        console.log('los datos de la confirmacion para la solicitud:'+data.id)
        console.log(data)
     //  

  
        try {
            const confirmated=await Api.confirmar(data.solicitud,data.id,data.observation,data.datetime)
            console.log('vaLIDANDO ESTUS DE CONFIRMACION')
         //   console.log( confirmated)

            Alert.alert('Confirmacion','Se ha Enviado tu confirmación')
            var id=data.id
            console.log('la solicitud enviada es de tipo:'+id)
            switch(id)
            {
               
                case 1:
                    setstatus_cs('')

                    await AsyncStorage.removeItem("@confirmarsolicitud");   
                case 2:
                    setstatus_cc('')

                    await AsyncStorage.removeItem("@confirmarcarga");     
                
                case 3:
                    setstatus_cd('')
                    await AsyncStorage.removeItem("@confirmardescarga");     
                case -1:
                    await AsyncStorage.removeItem("@confirmarcarga");     

            }

        } catch (error) {
            onRefresh()
            console.log('error al confirmar : '+error)
           
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
      const openconfirmation=()=>{
        var validate=travel_current.travel_confirmed
        if(validate){
            Alert.alert('Ya ha sido confirmada')

        }else{
            
            setConfimated(true)

        }

    }
    const openconfirmation2=()=>{
        var validate=travel_current.pickup_confirmed
        if(validate){
            Alert.alert('Ya ha sido confirmada')

        }else{
            
            setMpicked(true)

        }

    }
    const openconfirmation3=()=>{
        var validate=travel_current.delivery_confirmed
        if(validate){
            Alert.alert('Ya ha sido confirmada')

        }else{
            
            setMdeliveri(true)

        }

    }

    if(isload==1){
        return(
            <ScrollView style={{margin:4}} refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }>
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}> 
                <Text style={Styles.simpletext}>{message}</Text>

            </View>
            </ScrollView>
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
                setConfimated(!modalVpicked);
               }}>
                <CPicked solicitud= {travel_current.id} modalVisible={modalVpicked}  setModalVisible={setMpicked}  onRefresh={onRefresh} isConnected={isConnected}/>
                </Modal>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalconfirmated}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setMpicked(!modalconfirmated);
               }}>
                <Confirmated solicitud= {travel_current.id} modalVisible={modalconfirmated} setModalVisible={setConfimated} onRefresh={onRefresh} isConnected={isConnected}/>
                </Modal>

                <Modal
                animationType="slide"
                transparent={true}
                visible={modaldelivery}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setMdeliveri(!modaldelivery);
               }}>
                <Cdelivery solicitud= {travel_current.id} modalVisible={modaldelivery} setModalVisible={setMdeliveri}  onRefresh={onRefresh} isConnected={isConnected}/>
                </Modal> 
            
                < Maps  
                lto={travel_current.lat_origin} 
                lno={travel_current.lon_origin}
                ltd={travel_current.lat_destiny}
                lnd={travel_current.lon_destiny}
                waypoints_destiny={travel_current.waypoints_destiny}
                origen={origen}
                destino={travel_current.destiny}
                solicitud={travel_current.id}/>
               
    
                <ScrollView style={{margin:4}} 
                refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}/>
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
                           <Text  style={Styles.simpletext}>{global.vehicle_carga}  </Text>
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={Styles.titletext}>Cliente: </Text>
                           <Text  style={Styles.simpletext}>{travel_current.client} </Text>                     
                        </View>  
                        <Text style={style.textbutton}> Asignacion de solicitud</Text>
                        <TouchableOpacity 
                            onPress={openconfirmation} style={[style.button,{backgroundColor:solicitudcolor1}]}>
                            <Text style={Styles.simpletext1}>Confirmar Solicitud</Text>
                            <Text style={Styles.simpletext1}>{status_cs}</Text>
                            <Text style={Styles.simpletext1}>{operations.convert_utc_local1(travel_confirmed_date)}</Text>
                        </TouchableOpacity>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                            <Text style={style.text3}>Direccion origen:  </Text>
                            <Text style={style.text4}>{travel_current.origin_address} </Text>
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                            <Text style={style.text3}>Cita de carga:  </Text>
                            <Text style={style.text4}> {operations.fechaFormateada(travel_current.pickup_datetime)} </Text> 
                        </View>
                        <TouchableOpacity 
                    onPress={inst} style={[style.button,{backgroundColor:solicitudcolor}]}> 
                            <Text style={Styles.simpletext}>Instrucciones de viaje</Text>
                        </TouchableOpacity>
                        <Text style={style.textbutton}>Llegada origen: {origen}</Text>
                        <TouchableOpacity 
                        onPress={openconfirmation2}
                        style={[style.button,{backgroundColor:cargacolor1}]}>
                            <Text style={Styles.simpletext1}>Confirmar Carga </Text>
                            <Text style={Styles.simpletext1}>{status_cc} </Text>
                            <Text style={Styles.simpletext1}>{operations.convert_utc_local1(pickup_confirmed_date)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={getCP}
                         style={[style.button,{backgroundColor:cargacolor}]
                    }>
                            <Text style={Styles.simpletext}>VER Carta Porte</Text>
                            <Image source={require('../drawables/pdfattt.png')} style={style.logotel} />
                        </TouchableOpacity>

                   

                        <TouchableOpacity 
                        onPress={repartos}
                        style={[style.button,{backgroundColor:cargacolor}]}>
                            <Text style={Styles.simpletext}>Repartos / Recoleccion </Text>
    
                        </TouchableOpacity>

                        <View  style={[style.horizontal,{backgroundColor:cargacolor}]}>
                            <Text style={style.text3}>Direccion Destino:  </Text>
                            <Text style={style.text4}>{travel_current.destiny_address}  </Text>
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:cargacolor}]}>
                            <Text style={style.text3}>Cita de descarga:  </Text>
                            <Text style={style.text4}>{operations.fechaFormateada(travel_current.delivery_datetime)}</Text>
                        </View>
                        <Text style={style.textbutton}>Llegada Destino{travel_current.destiny} </Text>
                        <TouchableOpacity
                        onPress={openconfirmation3}  
                        style={[style.button,{backgroundColor:descargacolor1}]}>
                            <Text style={Styles.simpletext1}>Confirmar Descarga  </Text>
                            <Text style={Styles.simpletext1}>{status_cd}</Text>
                            <Text style={Styles.simpletext1}>{operations.convert_utc_local1(delivery_confirmed_date)}</Text>
                        </TouchableOpacity>
                        <Text style={style.textbutton}>Salida Destino</Text>
                        <TouchableOpacity  style={[style.button,{backgroundColor:descargacolor}]}
                         onPress={() => Linking.openURL('tel:+52'+global.phone)}>
                            <Text style={Styles.simpletext}>Llamar lider de flota  </Text>
                            <Image source={require('../drawables/call.png')} style={style.logotel} />
                        </TouchableOpacity>
                   
    
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
        elevation:8,
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