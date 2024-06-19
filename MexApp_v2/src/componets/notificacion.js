import react,{useState} from "react";
import { View,Text,Image, Touchable, TouchableOpacity,Modal } from "react-native";
import Style from "../styles/styles";
import OpenNotificaton from "../modals/openNotification";

function Notification (props){
    const context=props
    const [modalVisible1, setModalVisible1] = useState(false);
    const [messageData,setMessageData]=useState({})

    const openmodal=()=>{
        var data={"body": context.body, "id_screen": "1", "image": context.image, "screen_name": "home", "title": context.title}
        setMessageData(data)
        setModalVisible1(true)
    }


    return(
        <TouchableOpacity onPress={openmodal} style={Style.contencard}>
             <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      >
     <OpenNotificaton setModalVisible={setModalVisible1} messageData={messageData} />

      </Modal>

            <View style={Style.horizontal} >
            <View>
                <Image
                source={{ uri: context.image}}
                style={{width:50,height:70,resizeMode:'contain'}}/>
            </View  >
            <View >
            <Text style={{ textAlign:'right',width:"100%"}}>{context.date} </Text>
            
                    <Text style={Style.titletext}>{context.title}</Text>
                    <Text style={Style.simpletext}>{context.body}</Text>

            </View>

            </View>

          
        </TouchableOpacity>
    )


}
export default Notification