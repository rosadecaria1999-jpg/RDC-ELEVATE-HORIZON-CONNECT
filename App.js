import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { AppPreferenceProvider } from './components/AppPreferencesContext';  

export default function App() {
  return (
    <AppPreferenceProvider>                                                    
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <MainNavigator />
            <StatusBar style="auto" />
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppPreferenceProvider>                                                  
  );
}