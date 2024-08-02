import React,{useEffect,useState} from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions,Text,Pressable } from 'react-native';
import ModalStyle from '../styles/modalsstyle'
import Intranet from '../api/intranet';
import UrlsLists from '../containers/imagesurllist';

const { width } = Dimensions.get('window');



const OpenNotificaton = (props) => {
  const [Ration,setRation]=useState(1.0)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [images,setImage]=useState([])




  useEffect(() => {
    setImage(props.messageData.images)
    console.log(props.messageData.images)
    setView()

  },[])
  const handleImageLoad = (event) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    var realtion=imgWidth/imgHeight
    setRation(realtion)
    setImageDimensions({ width: imgWidth, height: imgHeight });
  };

  const setView =async()=>{
    console.log(props.messageData.id)
    var id_n=props.messageData.id
    const view= await Intranet.insert_review(id_n , global.id_operador) 
    console.log(view)
  }
  const onclose=()=>{
    props.setModalVisible(false)
  }

  return (
  <View  style={ModalStyle.content1}>
    <View style={{backgroundColor:'#fff', marginTop:20,}}>
      <Text style={ModalStyle.title}>{props.messageData.title[0].description}</Text>
      <Text style={ModalStyle.texto}>{props.messageData.body}</Text>
      </View>
      <UrlsLists images={images}/>
      <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '0%', //for center align
            alignSelf: 'flex-end' //for align to right
        }}
    >
      <Pressable style={{width:40,height:40,backgroundColor:'#eaeaeacc',alignItems: 'center',
            alignContent:'center',marginLeft:10,}} onPress={onclose}>
              <Image 
              
              style={{width:30,height:30,resizeMode:'contain',alignItems: 'center',marginTop:7}}
              source={require('../drawables/onclose.png')}/>
            </Pressable>
                </View>
    
  </View>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor:'#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: width,
  },
  image: {
    width: width,
    height: undefined,
    aspectRatio: 1, // Puedes ajustar esto según la relación de aspecto de tus imágenes
  },
});

export default OpenNotificaton;


