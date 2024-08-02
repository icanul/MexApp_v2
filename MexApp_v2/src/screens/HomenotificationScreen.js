import React , { useEffect, useState }from 'react';
import { Text,ScrollView, RefreshControl} from 'react-native';
import Intranet from '../api/intranet';
import NotificationList from '../containers/notificationsList';

function HomeNotificationScreen(props){
    const [items, setItems] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
   //     getdata()
    
      },[])

    const getdata=async()=>{
        try {
            getnotification=await Intranet.get_notification_topi_mexapp('TODOS')
            data=  await getnotification.json();
            setItems(data.notifications)
            console.log(data.notifications)
            
        } catch (error) {
            
        }
      

    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getdata()
        wait(2000).then(() => setRefreshing(false));
      }, []);
    
      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    return(
    <ScrollView 
    style={{flex:1, width:'100%',height:'100%',backgroundColor:'#f4fbfb'}}
    refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
        <NotificationList items={items}/>
      
    </ScrollView>

    )

}
export default HomeNotificationScreen