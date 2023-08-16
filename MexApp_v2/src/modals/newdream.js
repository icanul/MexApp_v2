import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet, Pressable ,Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DTPicker from '../componets/datetimePicker'
import Api from '../api/intranet';
import { Alert } from 'react-native';
import Styles from '../styles/styles'




function NewDream (props){
    const context=props

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [date1, setDate1] = useState(new Date());
    const [time1, setTime1] = useState(new Date());
    const [isload,serLoad]= useState(false);



    async function newdream(){
      serLoad(true)
      var init =date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+' '+time.getHours()+":"+time.getMinutes()
      var end =date1.getDate()+"-"+(date1.getMonth()+1)+"-"+date1.getFullYear()+' '+time1.getHours()+":"+time1.getMinutes()
      console.log('fecha inicio: '+init+' '+'fecha fin: '+end)

      try {

          const dreams=await Api.New_Dream(init,end)
          Alert.alert(dreams)
          context.onRefresh()
          context.setModalVisible(false)
          
      } catch (error) {
          console.log(error)
      }
    

  }

    const getdateinit=()=>{
      
      var today =date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
      return today
 
    }
    const getimeinit=()=>{
      var hora=time.getHours()+":"+time.getMinutes()
      return hora 
      
    }
    const getdateend=()=>{
      var today =date1.getDate()+"-"+(date1.getMonth()+1)+"-"+date1.getFullYear()
      return today
 
    }
    const getimeend=()=>{
      var hora=time1.getHours()+":"+time1.getMinutes()
      return hora 
      
    }



 

    const send=()=>{
      context.onRefresh()
        context.setModalVisible(false)
    }
 if(isload==true){

        return(
            <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
            
        </View>

        )
    }else{
      return(
        <View style={style.content}>
          <View style={style.modal} >
            <Text style={style.title}>Inicio de sueño</Text>
            <View style={style.horizontal}>
            <Text style={Styles.simpletext}>Inicio:</Text>
              <Text style={Styles.simpletext}>{getdateinit() } </Text>
            <DTPicker dato={date} setDato={setDate} logo={require('../drawables/date.png')}  mode="date"/>
            <Text style={Styles.simpletext}>  {getimeinit() } </Text>
           <DTPicker dato={time} setDato={setTime} logo={require('../drawables/timer.png')}  mode="time"/>

            </View>
            <View style={style.horizontal}>
            <Text style={Styles.simpletext}>Fin:    </Text>
            <Text style={Styles.simpletext}>{getdateend() } </Text>
            <DTPicker dato={date1} setDato={setDate1} logo={require('../drawables/date.png')}  mode="date"/>
            <Text style={Styles.simpletext}>  {getimeend() } </Text>
           <DTPicker  dato={time1} setDato={setTime1} logo={require('../drawables/timer.png')}  mode="time"/>
            </View>

            <View style={style.horizontal} >
            <Pressable 
            onPress={newdream}
            style={style.button}>
                <Text style={style.textbutton}>Confirmar</Text>
            </Pressable>
            <Pressable 
            onPress={send}
            style={style.button1}>
                <Text style={style.textbutton}>cancelar</Text>
            </Pressable>

            </View>
          </View>
            
           
        </View>

    )

    }
   
   

};
const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

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
        color:'#393d42',


       
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },


})
export default NewDream;
