import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'
import Reporter from '../componets/reporter'



class ReporterList extends Component{

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text="ningun resultado coincide con la busqueda  :("></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Reporter {...item }></Reporter>
        )
    }
    render(){

        return(

            <Layout>
            
        
            <FlatList
             keyExtractor={this.keyExtractor}
             data={this.props.data}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default ReporterList

