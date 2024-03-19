import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const PuntoColorido = (props) => {
    const [color,setColor]= useState('blue')
    useEffect(() => {
        console.log(props.color)
        var color=props.color
      if(color==0)
      {
        setColor('green')

      }
      else if(color==1)
      {
        setColor('yellow')

      }
      else if(color==2)
      {
        setColor('red')
      }
      
     
       
    }, [])


  return (
    <View
      style={{
        width: 20,
        height: 20,
        margin:5,
        borderRadius: 10, // Esto hace que el View tenga forma de círculo
        backgroundColor: color, // Cambia 'blue' al color que desees
      }}
    />
  );
};

export default PuntoColorido;