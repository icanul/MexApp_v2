import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'
import Infografia from '../componets/infografia'


class EventList extends Component{
    

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text="NO SE ENCONTRARON INFOGRAFIAS"></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Infografia {...item}></Infografia>
        )
    }
    render(){

        return(
            

            <Layout>
            
        
            <FlatList
            horizontal={true}
             keyExtractor={this.keyExtractor}
             data={this.props.infografias}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default EventList

