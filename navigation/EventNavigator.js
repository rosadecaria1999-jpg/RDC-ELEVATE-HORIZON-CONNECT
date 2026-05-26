import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsListScreen from '../screens/EventsListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';


const Stack = createNativeStackNavigator();

const EventNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventsList"
        component={EventsListScreen}
        options={{ title: 'Events List' }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ title: 'Event Details' }}
      />
      <Stack.Screen
        name="EventRegistration"
        component={EventRegistrationScreen}
        options={{ title: 'Event Registration' }}
      />
    </Stack.Navigator>
  );
};

export default EventNavigator;