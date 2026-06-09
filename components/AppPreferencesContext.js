import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import lightTheme from "../themes/lightTheme.json";
import darkTheme from "../themes/darkTheme.json";

// Creates a Context object that components can subscribe to.
const AppPreferencesContext = createContext(null);

// Provider component that wraps the app and exposes the theme state to all children.
export const AppPreferenceProvider = ({ children }) => {
  // Tracks whether dark mode is active. Defaults to false (light mode).
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Runs once when the app starts.
  // Reads the saved preference from device storage and applies it.
  useEffect(() => {
    (async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem("isDarkMode");
        if (savedDarkMode !== null) setIsDarkMode(savedDarkMode === "true");
      } catch (e) {
        console.log("Error loading preferences:", e);
      }
    })();
  }, []);

  // Inverts the current value and persists the new choice to device storage.
  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("isDarkMode", String(newValue));
  };

  // Selects the active theme based on the current mode.
  // Merges the custom colours into Paper's default Material Design 3 theme,
  // ensuring all required theme properties (fonts, animations, etc.) are present.
  const theme = isDarkMode
    ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...darkTheme.colors } }
    : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...lightTheme.colors } };

  // Exposes the state, toggle function, and active theme to any descendant component.
  // PaperProvider applies the theme globally to all React Native Paper components.
  return (
    <AppPreferencesContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </AppPreferencesContext.Provider>
  );
};

// Custom hook for consuming the context.
// Throws an explicit error if used outside of the provider, making debugging easier.
export const useAppPreferences = () => {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used inside AppPreferenceProvider");
  }
  return context;
};
