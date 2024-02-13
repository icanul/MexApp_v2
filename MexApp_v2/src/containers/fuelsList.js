import React,{Component} from "react";
import { View, Text} from "react-native";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Fuel from '../componets/fuel'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'



class FuelList extends Component{
    
 

    keyExtractor = item => item.id.toString()
    renderEmtpy=()=><Empty text="No hay asignacionees disponibles"></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Fuel {...item}   onRefresh={this.props.onRefresh} ></Fuel>
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


export default FuelList

