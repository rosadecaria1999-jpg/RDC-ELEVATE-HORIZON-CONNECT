import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { AppPreferenceProvider } from './components/AppPreferencesContext';

export default function App() {
  return (
    // AppPreferenceProvider wraps the navigation tree.
    // All screens inside MainNavigator can now access the theme state.
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
