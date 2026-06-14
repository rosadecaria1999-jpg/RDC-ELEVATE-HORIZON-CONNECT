import { BottomNavigation } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import EventNavigator from './EventNavigator';
import SettingsScreen from '../screens/SettingsScreen';

const MainNavigator = () => {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'events', title: 'Event List', icon: 'event' },
        { key: 'settings', title: 'Settings', icon: 'settings' },
    ]);

    // Called from HomeScreen's button to jump to the Events tab.
    const goToEventsTab = () => setIndex(1);

    // Custom renderScene so we can pass the callback down to HomeScreen.
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'home':
                return <HomeScreen onViewEvents={goToEventsTab} />;
            case 'events':
                return <EventNavigator />;
            case 'settings':
                return <SettingsScreen />;
            default:
                return null;
        }
    };

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={false}
            sceneAnimationEnabled
            renderIcon={({ route, color }) => (
                <MaterialIcons name={route.icon} size={24} color={color} />
            )}
        />
    );
};

export default MainNavigator;