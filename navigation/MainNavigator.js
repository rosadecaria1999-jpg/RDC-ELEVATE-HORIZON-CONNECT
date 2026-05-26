import { View, Text} from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import EventNavigator from './EventNavigator';        
import SettingsScreen from '../screens/SettingsScreen';


const MainNavigator = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'events', title: 'Event List', icon: 'event' },
        { key: 'settings', title: 'Settings', icon: 'settings' },   // ← 'settings' with the s
]);

const renderScene = BottomNavigation.SceneMap({
  home: HomeScreen,
  events:EventNavigator,
  settings: SettingsScreen,   
});
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting ={false} //material shifting effect
      sceneAnimationEnable
      renderIcon={({route,color}) => <MaterialIcons name ={route.icon} size={24} color= {color}/>} 
    />
  );
}
export default MainNavigator
