import react from "react";
import { Text,View } from "react-native";
import Styles from '../styles/styles'
import Style from "../styles/styles";


function Dream(props){
    return(
        <View style={Style.contencard1}>
            <View style={Style.horizontal}>
                <Text style={Style.titletext}>INICIO:</Text>
                <Text style={Style.simpletext}>{props.fhi}</Text>
                <Text style={Style.titletext}>FIN:</Text>
                <Text style={Style.simpletext}>{props.fhf}</Text>

            </View>
        </View>
    )



}

export default Dream