import React,{ useState,useEffect} from 'react';
import { View,Text,StyleSheet,Image, Pressable,Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';

function CPicked (props){
    const [reporter,setReporter]=useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
    const [value,setValue]= useState('')
    const [isload,serLoad]= useState(false);    
    const context=props

    useEffect(() => {
        if(toggleCheckBox==true){
            setToggleCheckBox1(false)
            setToggleCheckBox2(false)
            setValue('Shipment')

        }
        else if(toggleCheckBox1==true){
            setToggleCheckBox(false)
            setToggleCheckBox2(false)
            setValue('Destino')

        }
        else if(toggleCheckBox2==true){
            setToggleCheckBox1(false)
            setToggleCheckBox(false)
            setValue('Cita de descarga')

        }
    })
    const send=()=>{
        context.setModalVisible(false)
        context.onRefresh()
    
     }
     async function Confirmar(){
        if(props.isConnected){
            serLoad(true)
            const now = new Date();
            const utcString = now.toISOString(); 
            console.log('hora utc de mexico:'+utcString)

            /*/const fecha = new Date();
            var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes() /*/
           
            try {
                const confirmated=await Api.confirmar(context.solicitud,2,"",utcString)
                if( confirmated.status==200|| confirmated.status==202){
                    Alert.alert("Se confirmo correctamente")
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
                console.log(error)
                send()
                
            }

        }
        else{
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
          await AsyncStorage.setItem('@confirmarcarga', jsonValue)
          Alert.alert(
            "No se pudo enviar",
            "confirmación de carga guardada. se enviara cuando tengas conexión a internet",
            [
           
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        } catch (e) {
          // saving error
        }
      }

    async function noConfirmar(){
        const fecha = new Date();
        var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()
         
        try {
            const confirmated=await Api.confirmar(context.solicitud,-1, value,datetime)
            console.log(confirmated)
            send()
        } catch (error) {
            var confirmation={
                id:-1,
                solicitud:context.solicitud,
                observation:value,
                datetime:datetime
            }
            confirmationStore(confirmation)
            console.log(error)
            send()
            
        }
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
                    <Text style={style.title}>¿Coinciden documentos con solicitud asignada? </Text>
        
                    <View style={style.horizontal}>
                    <Pressable 
                    onPress={Confirmar}
                    style={style.button}>
                        <Text style={style.textbutton}>si</Text>
                    </Pressable>
                    <Pressable 
                    onPress={() => setReporter(true)}
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
            <View style={style.modal} >
              <Text style={style.title}>Reportar un problema</Text>
              <View style={style.check_s}>
                    <View  style={style.checkbox}>
                        <CheckBox
                         disabled={false}
                        value={toggleCheckBox}
                        tintColors={{ true: '#F15927', false: 'black' }}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                       <Text style={{color:'#000000'}}>Shipment</Text>
    
                    </View>
                    <View  style={style.checkbox}>
                        <CheckBox
                         disabled={false}
                        value={toggleCheckBox1}
                        tintColors={{ true: '#F15927', false: 'black' }}
                        onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                        />
                       <Text style={{color:'#000000'}}>Destino</Text>
    
                    </View>
                    <View  style={style.checkbox}>
                        <CheckBox
                         disabled={false}
                        value={toggleCheckBox2}
                        tintColors={{ true: '#F15927', false: 'black' }}
                        onValueChange={(newValue) => setToggleCheckBox2(newValue)}
                        />
                       <Text style={{color:'#000000'}}>Cita de descarga</Text>
    
                    </View>
                    </View>
            
    
              <View style={style.horizontal}>
              <Pressable 
              onPress={noConfirmar}
              style={style.button}>
                  <Text style={style.textbutton}>Enviar</Text>
              </Pressable>
              <Pressable 
              onPress={send}
              style={style.button1}>
                  <Text style={style.textbutton}>Cancelar</Text>
              </Pressable>
              </View>
    
              </View>
            </View>
    

         )
       
     }
  

    
};
}

const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

    },
    checkbox:{
        flexDirection:'row',
  
    },
    check_s:{
        marginTop:10,

    },
    image:{
        width:200,
        height:200,
    },

    modal:{
      width:300,
      height:200,
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
export default CPicked;