import React ,{ useState,useEffect }from "react";
import { View,Text,Pressable,TextInput ,Image, Alert,Dimensions, ScrollView} from "react-native";
import ModalStyle from '../styles/modalsstyle'
import axios from 'axios';
import Reload from "./reload";


const { width } = Dimensions.get('window');


function Evidence_ins_modal(props){
    const [Ration,setRation]=useState(1.0)



    const handleImageLoad = (event) => {
        const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
        var realtion=imgWidth/imgHeight
        setRation(realtion)
      };

   
    const close=()=>{
        props.setModalVisible(false)
    }
    
    return(
        <View  style={ModalStyle.content1}>
    <View style={{backgroundColor:'#fff', marginTop:20,}}>
           
   <ScrollView>
             
    {props.images.map((image, index) => (
          
          <Image
          source={{ uri: image.uri}} // Reemplaza con la URL de tu imagen
          style={{  width: '100%',
            margin:5,
              height: undefined,
              aspectRatio: Ration,}}
          resizeMode="contain"
          onLoad={handleImageLoad}/>   
        ))}
        </ScrollView>
        
        <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '0%', //for center align
            alignSelf: 'flex-end' //for align to right
        }}
    >
      <Pressable style={{width:40,height:40,backgroundColor:'#eaeaeacc',alignItems: 'center',
            alignContent:'center',marginLeft:10,}} onPress={close}>
              <Image 
              
              style={{width:30,height:30,resizeMode:'contain',alignItems: 'center',marginTop:7}}
              source={require('../drawables/onclose.png')}/>
            </Pressable>
                </View>
    
            

         
                
</View>
    
    </View>

    )

}


export default Evidence_ins_modal;