import {
  
    StyleSheet,
   
}from 'react-native';


const Style=StyleSheet.create({
    simpletext:{
        color:'#393d42',
        margin:5

    },
    simpletextm:{
        color:'#393d42',
        marginLeft:10,
        fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,


    },
    titletext:{
        color:'#393d42',
        fontWeight: 'bold',
        margin:5

    },
    horizontal:{
        flexDirection:'row',
       
        marginLeft:5,
        marginRight:5

    },
    hcentrar:{
        flexDirection:'row',
        alignItems:'center', 
        alignContent:'center',
        justifyContent:'center',
        marginLeft:5,
        marginRight:5

    },
    contencard:{
        flex: 1,
        margin:5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor:'#ffffffcc',
        justifyContent: 'center',

    },
    contencard1:{
        flex: 1,
        margin:5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor:'#ffffffcc',
        justifyContent:'space-between'
    }
    
   

})
export default Style
