import React, { useEffect, useState } from 'react';
import { View,Text,ScrollView,StyleSheet,Image,Pressable, Alert,Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import storageData from '../utils/storageData';
import Help from '../modals/helpmodal';
import TMS from '../api/tms'

function Detailscreen (props){
    const context=props 
    const [helpmodal,setHelpmodal]=useState(false)
    const [helpmodal1,setHelpmodal1]=useState(false)
    const navigation = useNavigation();
    const [photo,setPhoto]=useState('')

    useEffect(() => {
        getfoto()

    },[])
    const getfoto=async ()=>{
        console.log('buscando foto')
        const savephoto = await storageData.consultData('@PHOTO_operador')
        if(savephoto==null){
            try {
                const operador=await TMS.getOperador( id_operador)
                console.log(operador)
                setPhoto(operador.image)
                const save = await storageData.insertData('@PHOTO_operador',operador)
                
            } catch (error) {
                console.log(error)
                
            }

        }
        else{
            console.log('hay una foto guardada')
            var convert=JSON.parse(savephoto)
            console.log(convert)
            setPhoto(convert.image)

        }

    }


    const removedata = async (key) => {
      
        try {
            await storageData.deleteData("@user_storage")
            await storageData.deleteData("@gasto")
            await storageData.deleteData("@info_operador")
            await storageData.deleteData("@evidenciagasto")
            await storageData.deleteData("@evidence")
            await storageData.deleteData("@PHOTO_operador")
            await storageData.deleteData("@confirmarcarga")
            await storageData.deleteData("@confirmardescarga")
            await storageData.deleteData("@confirmarsolicitud")
            await storageData.deleteData("@dreams_current")//travelCurrent_storage
            await storageData.deleteData("@travelCurrent_storage")//travelCurrent_storage
           console.log('se borro todo')
           context.setLogget(0)
            return true;
        }
        catch(exception) {
            console.log("error"+exception)
            return false;
        }
    }
    const loginpress=()=>{
        Alert.alert('Cerrar Sesión',
        '¿Estas seguro que  quieres salir?  Se borraran todos lo datos de la aplicación?',
        [
            {
                text:'Si',
                onPress:removedata
            },
            {
                text:'No'
            }
        ] )

    }
    const openOperator=()=>{
        navigation.navigate('operador')
    }
    const openunidad=()=>{
        navigation.navigate('unidad')
    }
    const opencontact=()=>{
        navigation.navigate('contactos')
    }
    const openNom87=()=>{
        navigation.navigate('nom87')
    }
    const opeliquidaciones=()=>{
        navigation.navigate('liquidaciones')
    }
    const opendepositos=()=>{
        navigation.navigate('depositos')
    }
    const opengastos=()=>{
        navigation.navigate('gastos')
    }
    const opencamera=()=>{
        navigation.navigate('evidencias')
    }
    const openfuel=()=>{
        navigation.navigate('fuels')
    }
    const help=()=>{
        setHelpmodal(true)
       // navigation.navigate('log')
        
    }
    const maintenance=()=>{
      // setHelpmodal1(true)
        navigation.navigate('reporter')
        
    }
    const pandape=()=>{
        // setHelpmodal1(true)
          navigation.navigate('pandape')
          
      }
      const noty=()=>{
        // setHelpmodal1(true)
          navigation.navigate('noty')
          
      }
      const mexatrueke=()=>{
        // setHelpmodal1(true)
          navigation.navigate('mexatrueke')
          
      }
    return(
        <ScrollView style={{backgroundColor:'#eaeaea'}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={helpmodal}>
                <Help setHelpmodal={setHelpmodal}/>
            </Modal>
         
            <View style={style.header}>
                <Image  source={{uri: `data:image/jpeg;base64,${photo}`}}  style={style.logo}/> 
             

              
                <View style={style.vertical}>
                    <Text style={style.name}>{ global.nombre}</Text>
                    <Text style={style.name}>CEOP { global.celula}</Text>
                    <Pressable
                     style={style.button}
                     onPress={openOperator}             >  
                    <Text style={style.textbutton}>Ver Perfil</Text>
                    </Pressable>
                  
                </View>
             
            </View>
            <Pressable
            onPress={openunidad} 
            style={style.menuitems}>
                    <Image source={require('../drawables/itruck.png')} style={style.menuicon} />
                    <Text style={style.menutext}>UNIDAD {global.alias}</Text>

                </Pressable>
                <Pressable 
                 onPress={opencontact} 
                style={style.menuitems}>
                    <Image source={require('../drawables/contacts.png')} style={style.menuicon} />
                    <Text style={style.menutext}>CONTACTOS</Text>

                </Pressable>
                <Pressable 
                 onPress={openNom87} 
                style={style.menuitems}>
                    <Image source={require('../drawables/bitacora.png')} style={style.menuicon} />
                    <Text style={style.menutext}>NOM 87</Text>

                </Pressable>
                <Pressable style={style.menuitems}
                 onPress={opeliquidaciones}>
                    <Image source={require('../drawables/icon_liq.png')} style={style.menuicon} />
                    <Text style={style.menutext}>LIQUIDACIONES</Text>

                </Pressable>

                <Pressable style={style.menuitems}
                 onPress={opendepositos}>
                    <Image source={require('../drawables/icon_dep.png')} style={style.menuicon} />
                    <Text style={style.menutext}>DEPOSITOS</Text>

                </Pressable>
                <Pressable style={style.menuitems}
                 onPress={opengastos}>
                    <Image source={require('../drawables/gastos.png')} style={style.menuicon} />
                    <Text style={style.menutext}>GASTOS</Text>

                </Pressable>

                <Pressable style={style.menuitems}
                 onPress={opencamera}>
                    <Image source={require('../drawables/camera.png')} style={style.menuicon} />
                    <Text style={style.menutext}>EVIDENCIAS</Text>

                </Pressable>
                <Pressable style={style.menuitems}
                 onPress={openfuel}>
                    <Image source={require('../drawables/fuel.png')} style={style.menuicon} />
                    <Text style={style.menutext}>COMBUSTIBLE</Text>
                </Pressable>

                <Pressable style={style.menuitems}
                 onPress={maintenance}>
                    <Image source={require('../drawables/mante.png')} style={style.menuicon} />
                    <Text style={style.menutext}>REPORTES MTO</Text>
                </Pressable>

                <Pressable style={style.menuitems}
                 onPress={pandape}>
                    <Image source={require('../drawables/logo.png')} style={style.menuicon} />
                    <Text style={style.menutext}>PANDAPE</Text>
                </Pressable>
                <Pressable style={style.menuitems}
                 onPress={mexatrueke}>
                    <Image source={require('../drawables/mexatrueke.png')} style={style.menuicon} />
                    <Text style={style.menutext}>MEXA TRUEKE</Text>
                </Pressable>
                <Pressable style={style.menuitems}
                 onPress={noty}>
                    <Image source={require('../drawables/noty.png')} style={style.menuicon} />
                    <Text style={style.menutext}>NOTIFICACIONES</Text>

                </Pressable>

                <Pressable style={style.menuitems}
                 onPress={help}>
                    <Image source={require('../drawables/help.png')} style={style.menuicon} />
                    <Text style={style.menutext}>ACERCA DE MEXAPP</Text>
                </Pressable>
               
            
              
                <Pressable style={style.menuitems}
                 onPress={loginpress}>
                    <Image source={require('../drawables/shutdown.png')} style={style.menuicon} />
                    <Text style={style.menutext}>CERRAR SESSION</Text>

                </Pressable>
                
               

            
       
           
        </ScrollView>

    )


    

};

const style=StyleSheet.create({
    logo:{
        marginTop:5,
        width:105,
        height:115,
        borderWidth: 3, // Ancho del borde en píxeles
        borderColor: '#eaeaea', // Color del borde
        borderRadius:360,
        resizeMode:'contain',
        elevation:9,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      
    
      },
      name:{
          width:'99%',
          color: '#ffffff',
          marginLeft:5,
          textAlign: 'center',

      },
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,
          color:'#393d42',

      },
      textbutton:{
        fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    marginTop:10,
    color: '#ffffff',

    },
    menuicon:{
        width:40,
        height:40,
        margin: 5,
        resizeMode:'contain',
    },
   
  
    horizontal:{
      
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 4,
        elevation: 3,
     

    },
      
    header:{
      
        backgroundColor:'#CB333Bcc',
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 9,
        borderRadius: 10,
        marginBottom:5,
        margin: 5,
        
     

    },
    menuitems:{
       
        backgroundColor:'#ffffff',
        flexDirection:'row',
        margin:5,
        elevation: 3,
        borderRadius:9
    },
    vertical:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    }
  
  })
export default Detailscreen;