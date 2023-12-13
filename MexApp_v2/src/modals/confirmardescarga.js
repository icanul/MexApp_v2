import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet,Image,Pressable, Alert,TextInput,Modal} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidateDocument from './validatedocument';
import TmsReports from './reporttms';



function Cdelivery (props){

  const context=props;
  const [reporter,setreporter]=useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [text, setText] = useState('');
  const [observacion,setObservacion]= useState('Sin problemas')
  const [id_causa,setCausa]= useState(0)
  const [id_notification,setIdNotification]=useState(0)
  const [isload,serLoad]= useState(false);
  const [modalVisible1,setModalVisible1]=useState(false)
  const [modalVisible,setModalVisible]=useState(false)


      const handleCheck1 = () => {
        setIsChecked1(!isChecked1);
        if (!isChecked1) {
            setCausa(3)
            setIdNotification(63)
            setObservacion('Documentación incompleta')
            setIsChecked(false)
          // Aquí se muestra el alert
          onpresscheck()
        }
      };
      const handleCheck2 = () => {
        setIsChecked2(!isChecked2);
        if (!isChecked2) {
            setCausa(2)
            setIdNotification(64)
            setObservacion('Mercancía por devolución')
            setIsChecked(false)
          // Aquí se muestra el alert
          onpresscheck()
        }
      };
      const handleCheck3 = () => {
        setIsChecked3(!isChecked3);
        if (!isChecked3) {
          setCausa(10)
          setIdNotification(65)
            setObservacion('Faltante de origen')
            setIsChecked(false)
          // Aquí se muestra el alert
          onpresscheck()
        }
      };
      const handleCheck4 = () => {
        setIsChecked4(!isChecked4);
        if (!isChecked4) {
          setCausa(18)
          setIdNotification(66)
            setObservacion('Sin comprobante de maniobras')
            setIsChecked(false)
          // Aquí se muestra el alert
          onpresscheck()
        }
      };
      const handleCheck5 = () => {
        setIsChecked5(!isChecked5);
        if (!isChecked5) {
          setCausa(17)
          setIdNotification(67)
            setObservacion('Rechazo total')
            setIsChecked(false)
          // Aquí se muestra el alert
          onpresscheck()
        }
      };
      
      
    const onpresscheck=()=>{
        setModalVisible(true)
    }
    async function Confirmar(){
      const now = new Date();
      const utcString = now.toISOString(); 
      console.log('hora utc de mexico:'+utcString)

      /*/const fecha = new Date();
      var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()/*/
      if(props.isConnected==true){
        console.log('si estoy aqui es un maldito error')
        serLoad(true)
        try {
           const confirmated=await Api.confirmar(context.solicitud,3,observacion)
          console.log( confirmated.status)
            if( confirmated.status==200|| confirmated.status==202){
                Alert.alert("Se confirmo correctamente, llama a tu lider de flota")
            }      
            send()
          
        } catch (error) {
          var confirmation={
            id:2,
            solicitud:context.solicitud,
            observation:'',
            datetime:datetime
        }
        confirmationStore(confirmation)
             
        }

      }else
      {
        const fecha1 = new Date();
        var datetime=fecha1.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes() 
        Alert.alert
        (
          'MexApp',
          'NO hay conexión desea guardar la confirmacion',
          [
            {
              text: 'si',
              onPress: () => {
                var confirmation={
                  id:2,
                  solicitud:context.solicitud,
                  observation:'',
                  datetime:datetime
              }
              confirmationStore(confirmation)
              send()

              },
            },
           
            {
              text: 'Cancelar',
              onPress:()=>{
                send()
              }
            },
          ]

        )
      }
   
    }

    const confirmationStore = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@confirmardescarga', jsonValue)
          Alert.alert(
            "Datos guardados",
            "Se ha guardado la confirmación, esta se enviara cuando tengas conexión internet",
            [
           
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );


        } catch (e) {
          // saving error
        }
    }
   
    const send=()=>{
   
        context.setModalVisible(false)
        context.onRefresh()
    
     }
  
     if(isload==true){

        return(
            <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
            
        </View>

        )
    }else{


      if(reporter==false){ 
        return(
            <View style={style.content}>
                  <View style={style.modal} >
                    <Text style={style.title}>MexApp</Text>
                    <Text style={style.title}>Confirmo que finalizo descarga y recibí todos los documentos necesarios para el cobro del viaje </Text>
        
                    <View style={style.horizontal}>
                    <Pressable 
                    onPress={Confirmar}
                    style={style.button}>
                        <Text style={style.textbutton}>si</Text>
                    </Pressable>
                    <Pressable 
                    onPress={() => setreporter(true)}
                    style={style.button1}>
                        <Text style={style.textbutton}>no</Text>
                    </Pressable>
                    </View>
        
                    </View>
                  </View>
        )
     }
     else{
    return(
        <View style={style.content}>
            <Modal   
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
                <TmsReports  
                isConnected={props.isConnected}
                solicitud={context.solicitud} 
                setModalVisible={setModalVisible}
                 id_causa={id_causa} 
                 id_notification={id_notification}
                 setIsChecked1={setIsChecked1}
                 setIsChecked2={setIsChecked2}
                 setIsChecked3={setIsChecked3}
                 setIsChecked4={setIsChecked4}
                 setIsChecked5={setIsChecked5}
                />

            </Modal>
            <Modal   
            animationType="slide"
            transparent={true}
           
            visible={modalVisible1}>
                <ValidateDocument  solicitud={context.solicitud} setModalVisible1={setModalVisible1}/>

            </Modal>
              <View style={style.modal} >
            
                <Text style={style.title}>Reportar Problema:</Text>
                <View style={style.check_s}>
        
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                     tintColors={{ true: '#F15927', false: 'black' }}
                     value={isChecked1} 
                     onValueChange={handleCheck1}
                    />
                   <Text style={{color:'#000000'}}>Documentación incompleta  </Text>
                   <Pressable
                   onPress={()=> setModalVisible1(true)}>
                    <Image style={style.iconinfo} source={require('../drawables/inf.gif')}/>
                   </Pressable>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                  
                    tintColors={{ true: '#F15927', false: 'black' }}
                    value={isChecked2} 
                    onValueChange={handleCheck2}
                    />
                   <Text style={{color:'#000000'}}>Mercancía por devolución</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                     value={isChecked3} 
                     onValueChange={handleCheck3}
                    tintColors={{ true: '#F15927', false: 'black' }}
               
                    />
                   <Text style={{color:'#000000'}}>Faltante de origen</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                     value={isChecked4} 
                     onValueChange={handleCheck4}
                    tintColors={{ true: '#F15927', false: 'black' }}
                  
                    />
                   <Text style={{color:'#000000'}}>Sin comprobante de maniobras</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                     value={isChecked5} 
                     onValueChange={handleCheck5}
                    tintColors={{ true: '#F15927', false: 'black' }}
                  
                    />
                   <Text style={{color:'#000000'}}>Rechazo total</Text>

                </View>
                </View>  
                <View style={style.horizontal}>
                <Pressable 
                onPress={Confirmar}
                style={style.button}>
                    <Text style={style.textbutton}>si</Text>
                </Pressable>
                <Pressable 
                onPress={send}
                style={style.button1}>
                    <Text style={style.textbutton}>no</Text>
                </Pressable>
                </View>  
                </View>
              </View>
     

    )
}}
}

const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

    },
    input: {
        width:250,
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        color:'#000'
      },
      iconinfo:{
        width:25,
        height:25,

      },
    image:{
        width:200,
        height:200,
    },
    check_s:{
        marginTop:10,

    },

    modal:{
      width:300,
      height:400,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5


    },
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
     
   

  },
  checkbox:{
      flexDirection:'row',

  },


    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
    textbutton:{
        textAlign: 'center',
        color: '#ffffff',
     
        

    },
    title:{
      
        textAlign: 'center',
        fontSize:16,
        fontWeight: "bold",
        color:'#000000'

       
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },

})
export default Cdelivery;