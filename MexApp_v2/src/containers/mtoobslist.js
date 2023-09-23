import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'
import MtoObservatiion from "../componets/mtoobservacion";


class mtoObsList extends Component{
    

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text=""></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<MtoObservatiion {...item}></MtoObservatiion>
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


export default mtoObsList

