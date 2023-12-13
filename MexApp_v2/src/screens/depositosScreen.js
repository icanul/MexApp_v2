import React, { useEffect,useState } from 'react'
import { View,Pressable,StyleSheet,Image,Modal} from 'react-native';
import Depositoslist from '../containers/depositoslist';
import Api from'../api/tms'
import SetDeposito from '../modals/newDeposit'
import moment from 'moment/moment';




function DepositosScreen (){
    const [items, setItems] = useState([]);
    const [modalvisible, SetVisible] = useState(false);


    useEffect(() => {
        gettoken()
        
    }, [])
    async function gettoken(){
        try {
            const token= await Api.get_token_liq()
            console.log(token.token)
            Get_depositos(token.token)
            
        } catch (error) {
            
        }

    }

    async function Get_depositos(token){
        var inicio=moment().add(6,'h').format('YYYY-MM-DDTHH:MM')
        var fin=moment().subtract(100, 'd').format('YYYY-MM-DDTHH:MM')
        var fromtime=fin+':00.000Z'
        var totime=inicio+':00.000Z'

        try {

            const getdepositos=await Api.getdepositos(id_operador,fromtime,totime,token)
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )

           
            console.log(convert)
          
           setItems(convert)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
        <View style={{width:'100%',height:'100%' }}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalvisible}>
                <SetDeposito SetVisible={SetVisible}/>
                
            </Modal>
            <Depositoslist depositos={items}/>
            
          
        </View>
    )
};
/*/<View style={style.horizontal} >
            <Pressable onPress={() => SetVisible(true)}>
                <Image style={{width:50,height:50,margin:10}} source={require('../drawables/plus.png')}/>
            </Pressable>
            </View>/*/

const style = StyleSheet.create({
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',//use absolute position to show button on top of the map
        alignSelf: 'flex-end' ,
        top: '90%'//for align to right
       
    },
  
  })

export default DepositosScreen;