/**
 * @format
 */

import {AppRegistry,Alert} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const showNotification = (title, body, imageUrl) => {
  const localNotification = {
    title: title,
    body: body,
    bigPictureUrl: imageUrl,
    priority: 'high',
  };
  console.log('nmostrar notificaion en pantalla')

  //Alert.alert(localNotification.title, 'el mensaje dice'+localNotification.body);
};

messaging().onMessage(async remoteMessage => {
  const { title, body, image } = remoteMessage.data;
  console.log('la imagen es:'+image)
  showNotification(title, body, image);
});

AppRegistry.registerComponent(appName, () => App);
