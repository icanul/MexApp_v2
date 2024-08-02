import react,{useState,useEffect} from "react";
import { View,Text,Image, Dimensions, TouchableOpacity,Modal,StyleSheet } from "react-native";
import Style from "../styles/styles";
import OpenNotificaton from "../modals/openNotification";

const { width } = Dimensions.get('window');

function Notification (props){
    const context=props
    const [modalVisible1, setModalVisible1] = useState(false);
    const [messageData,setMessageData]=useState({})
    const [image,setImage]=useState('')
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [Ration,setRation]=useState(1.0)

    useEffect(() => {
        try {
            var im=context.images[0].image_url
            setImage(im)
        } catch (error) {
            setImage('')
            
        }    
      },[])
      const handleImageLoad = (event) => {
        const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
        var realtion=imgWidth/imgHeight
        setRation(realtion)
        setImageDimensions({ width: imgWidth, height: imgHeight });
      };

    const openmodal=()=>{
 
        setModalVisible1(true)
    }
    if(image===''){
        return(
            <TouchableOpacity onPress={openmodal} style={Style.contencard2}>
                  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      >
     <OpenNotificaton setModalVisible={setModalVisible1} messageData={props} />
 
      </Modal>
                  <View style={Style.horizontal} >
                  <Text style={Style.titletext}>{context.user_name}</Text>
                  <Text  style={Style.fechacard}>{context.insert}</Text>

                  </View>

                   <Text style={Style.titletext}>{context.title[0].description}</Text>
               <Text style={Style.simpletextm}>{context.body}</Text>
         
              
            </TouchableOpacity>
        )

    }
    else{
        return(
            <TouchableOpacity onPress={openmodal} style={Style.contencard2}>
                  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      >
     <OpenNotificaton setModalVisible={setModalVisible1} messageData={props} />

      </Modal>
                     <View style={Style.horizontal} >
                  <Text style={Style.titletext}>{context.user_name}</Text>
                  <Text  style={Style.fechacard}>{context.insert}</Text>
                  </View>
                   <Text style={Style.titletext}>{context.title[0].description}</Text>
               <Text  style={Style.simpletextm}>{context.body}</Text>
               <View style={styles.container}>
      <Image
        source={{ uri: image}} // Reemplaza con la URL de tu imagen
        style={{  width: width,
            height: undefined,
            aspectRatio: Ration,}}
        resizeMode="contain"
        onLoad={handleImageLoad}
      />
     
    </View>
            </TouchableOpacity>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
      },
      image: {
        width: width,
        height: undefined,
        aspectRatio: .44, // Inicialmente se establece un valor, pero se ajustará en `handleImageLoad`
      },
      text: {
        marginTop: 20,
        fontSize: 18,
      },
    });
 

export default Notification