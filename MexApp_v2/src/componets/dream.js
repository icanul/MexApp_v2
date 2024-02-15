import react,{useEffect,useState} from "react";
import { Text,View } from "react-native";
import Style from "../styles/styles";
import moment from 'moment/moment';
import Operations from "../utils/operations";




function Dream(props){
    const[fhi,setfhi]=useState('')
    const[fhf,setfhf]=useState('')
    const[duration,setduration]=useState('')


    useEffect(() => {

        let fechainit=Operations.convert_utc_local(props.from_time)
       setfhi(fechainit)
        let fechaend=Operations.convert_utc_local(props.to_time)
        setfhf(fechaend)
        let dif_hour=Operations.dif_hour(props.from_time,props.to_time)
        setduration(dif_hour)


    }, [])
    return(
        <View style={Style.contencard1}>
            <View style={Style.horizontal}>
                <Text style={Style.titletext}>INICIO:</Text>
                <Text style={Style.simpletext}>{fhi}</Text>
                <Text style={Style.titletext}>FIN:</Text>
                <Text style={Style.simpletext}>{fhf}</Text>

            </View>
            <View style={Style.horizontal}>
                <Text style={Style.titletext}>Insertado por:</Text>
                <Text style={Style.simpletext}>{props.comments_insert}</Text>
                <Text style={Style.titletext}>Duracion:</Text>
                <Text style={Style.simpletext}>{duration}</Text>

            </View>
    
        </View>
    )



}

export default Dream