import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'
import MtoEvidence from "../componets/mtoevidence";


class mtoEviList extends Component{
    

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text=""></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<MtoEvidence {...item}></MtoEvidence>
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
             numColumns={2}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default mtoEviList

