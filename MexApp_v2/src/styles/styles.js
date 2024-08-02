import {
  
    StyleSheet,
   
}from 'react-native';


const Style=StyleSheet.create({
    simpletext:{
        color:'#393d42',
        margin:5

    },
    simpletext1:{
        color:'#ffffff',
        margin:5,
        fontWeight:'bold'

    },
    simpletextm:{
        color:'#393d42',
        marginLeft:10,
        fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,


    },
    minilogo:{
        height:20,
        width:20,
        margin:5,   
    },
    titletext:{
        color:'#393d42',
        fontWeight: 'bold',
        fontSize:15,
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
    },
    contencard2:{
        flex: 1,
        margin:2,
        borderRadius: 30 / 2,
        backgroundColor:'#ffffffcc',
        justifyContent:'space-between'
    },
    fechacard:{
        color:'#393d42',
        marginLeft:10,
        fontSize: 14,
    lineHeight: 21,
    textAlign:'right',
    marginTop:5,
    letterSpacing: 0.25,
    },
    
   

})
export default Style
