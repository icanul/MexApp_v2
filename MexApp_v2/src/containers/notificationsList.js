import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'
import Notification from "../componets/notificacion";



class NotificationList extends Component{
    

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text="NO hay notificaciones"></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Notification {...item}></Notification>
        )
    }
    render(){

        return(
            

            <Layout>
            
        
            <FlatList
             keyExtractor={this.keyExtractor}
             data={this.props.items}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default NotificationList

