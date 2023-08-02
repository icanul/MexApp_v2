import {
  
    StyleSheet,
   
}from 'react-native';


const Style=StyleSheet.create({
    
    content:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#eaeaeacc',
    },

    checkbox:{
        flexDirection:'row',
    
    },
    check_s:{
        marginTop:10,
    
    },
    image:{
        width:200,
        height:200,
    },
    
    modal:{
      width:300,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5
    
    
    },
    modal2:{
      width:300,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5
    
    
    },
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
     
    
    
    },
    icon:{
        width:25,
        height:25,

    },
    texto:{
        color:'#000000',

    },
    horizontal1:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
       
      
      
      },
    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        
    
    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      
    
    },
    textbutton:{
        textAlign: 'center',
        color: '#ffffff',
     
        
    
    },
    title:{
      
        textAlign: 'center',
        fontSize:16,
        fontWeight: "bold",
        color:'#000000',
    
       
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },
      input: {
        width:250,
       
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        color:'#000'
      },  
    
    })
export default Style