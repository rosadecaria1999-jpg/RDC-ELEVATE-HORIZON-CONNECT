import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import EventsListScreen from '../screens/EventsListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';

const Stack = createNativeStackNavigator();

const EventNavigator = () => {
  // Get the active theme so the header bar follows light/dark mode.
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        // Header background colour follows the theme.
        headerStyle: { backgroundColor: theme.colors.surface },
        // Text and back-arrow colour follows the theme too.
        headerTintColor: theme.colors.onSurface,
        // Optional: make the title bold.
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
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