import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <MainNavigator />
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
