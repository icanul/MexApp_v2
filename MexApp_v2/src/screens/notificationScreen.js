import React,{useEffect,useState} from "react";
import { View,Text } from "react-native";
import NotificationList from "../containers/notificationsList";


function Notification(){
    const [items,setItems]=useState([])

    useEffect(()=>{
        var test=
        [
           {id:1,
            userinsert:'icanul',
            title:'Hola israel canul',
            body:'gracias por usar Mexapp',
            image:'https://cdn.pixabay.com/photo/2021/10/18/23/07/hiring-6722314_1280.png',
            date:'12/04/2024 12:00',
            is_active:'true'
,
           },
           {id:2,
           userinsert:'icanul',
           title:'No olvodes confirmar tu carga',
           body:'recuerda que debes confirmar tu carga, antes de salir del parque industrial',
           date:'12/04/2024 12:00',
           image:'https://cdn.pixabay.com/photo/2015/06/27/00/19/tracking-823141_640.png',
           is_active:'true'

          },
          {id:3,
          userinsert:'icanul',
          title:'Liquidacion Disponible',
          body:'Tienes una liquidacion disponible ,revisa en tu modulo de liquidaciones para mas',
          date:'12/04/2024 12:00',
          image:'https://lh3.googleusercontent.com/proxy/0smGROdD8L1kidjBOeOZx96V2tMjFdXfDrdi3XNJkdN45m5tjrqLCIgneMAyjKQ4NkaEeY4BSe0vdOe8xv-6Xc06-lHXTnEFPt6h33ZMdm2suasmqy9NXjkc3KTb2pTGuUUYkScaG-42_y5jRJ0zmyzDIgmgwJI',
          is_active:'true'

         },
         {id:4,
         userinsert:'icanul',
         title:'Nueva asignacion de combustible',
         body:'Se te ha asignado combustoble, olvides confirmar una vez hayas cargado la unidad',
         date:'12/04/2024 12:00',
         image:'https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096280_1280.png',
         is_active:'true'

        }

        ]
        setItems(test)

    },[])

    return(
        <View style={{ flex: 1,
            width:'100%',
            height:'100%'
            }}>
          <NotificationList  items={items}/>
        </View>
    )


}

export default Notification