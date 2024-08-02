import react,{useEffect,useState} from "react";
import { Pressable,Text,Dimensions,Image } from "react-native";

const { width } = Dimensions.get('window');

function Urlimage (props){
    const [Ration,setRation]=useState(1.0)
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const handleImageLoad = (event) => {
        const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
        var realtion=imgWidth/imgHeight
        setRation(realtion)
        setImageDimensions({ width: imgWidth, height: imgHeight });
      };
    console.log(props)

    return(
        <Pressable>
              <Image
        source={{ uri: props.image_url}} // Reemplaza con la URL de tu imagen
        style={{  width: '100%',
            height: undefined,
            aspectRatio: Ration,}}
        resizeMode="contain"
        onLoad={handleImageLoad}
      />
        </Pressable>
    )


}
export default Urlimage