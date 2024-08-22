import React ,{ useState,useEffect }from "react";
import { View,Text,Pressable,TextInput ,Image, Alert,Dimensions, ScrollView} from "react-native";
import ModalStyle from '../styles/modalsstyle'
import axios from 'axios';
import Reload from "./reload";


const { width } = Dimensions.get('window');


function Evidence_ins_modal(props){
    const [images,setImages]=useState([])
    const [Ration,setRation]=useState(1.0)
    const [load,setLoad]=useState(false)



    useEffect(() => {
        get_data()

    }, [])
    const handleImageLoad = (event) => {
        const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
        var realtion=imgWidth/imgHeight
        setRation(realtion)
      };

    const get_data=()=>{
        setLoad(true)
        console.log(props.id)
        const url = 'https://tms.logsys.com.mx/shipments.incidents.api/incidents/'+props.id+'/evidences';
        //const url = 'https://tms.logsys.com.mx/shipments.incidents.api/incidents/fc9c2274-2119-455f-a67d-3aed76a23acc/evidences';

        console.log(url)
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_incidencias}`   
          }
        };
          axios.get(url, config)
          .then(response =>{
            let imagenes=response.data.evidences
            setImages(imagenes)
            if(imagenes==0){
              close()
              Alert.alert('MexApp','No hay imagenes para mostrar')

            }
            console.log(images.length)
           
            
            setLoad(false)

        } )
          .catch(error => {
            setLoad(false)
            close()



          });

    }
    const close=()=>{
        props.setModalVisible(false)
    }
    
    return(
        <View  style={ModalStyle.content1}>
    <View style={{backgroundColor:'#fff', marginTop:20,}}>
           
   <ScrollView>
             
    {images.map((image, index) => (
          
          <Image
          source={{ uri: image.mediaLink}} // Reemplaza con la URL de tu imagen
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