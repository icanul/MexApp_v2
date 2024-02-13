import React,{Component} from "react";
import { View, Text} from "react-native";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Travel from '../componets/travel'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'



class Travelslist extends Component{

    keyExtractor = item => item.id.toString()
    renderEmtpy=()=><Empty text="Cargando viajes finalizados espere un momento...."></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Travel {...item}></Travel>
        )
    }
    render(){

        return(

            <Layout>
        
            <FlatList
             keyExtractor={this.keyExtractor}
             data={this.props.travels}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default Travelslist

