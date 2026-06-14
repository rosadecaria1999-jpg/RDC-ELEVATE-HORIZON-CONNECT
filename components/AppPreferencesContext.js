import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import lightTheme from "../themes/lightTheme.json";
import darkTheme from "../themes/darkTheme.json";

// Creates a Context object that components can subscribe to.
const AppPreferencesContext = createContext(null);

// Provider component that wraps the app and exposes the preferences to all children.
export const AppPreferenceProvider = ({ children }) => {
  // Tracks whether dark mode is active. Defaults to false (light mode).
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Tracks whether sound is enabled. Defaults to true (sound on).
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Font size preference. Can be 'small', 'medium', or 'large'. Defaults to 'medium'.
  const [fontSize, setFontSize] = useState('medium');

  // Calculated multiplier used to scale text across the app.
  const fontScale = fontSize === 'small' ? 0.85 : fontSize === 'large' ? 1.25 : 1.0;

  // Runs once when the app starts.
  // Reads saved preferences from device storage and applies them.
  useEffect(() => {
    (async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem("isDarkMode");
        if (savedDarkMode !== null) setIsDarkMode(savedDarkMode === "true");

        const savedSound = await AsyncStorage.getItem("isSoundEnabled");
        if (savedSound !== null) setIsSoundEnabled(savedSound === "true");

        const savedFontSize = await AsyncStorage.getItem("fontSize");
        if (savedFontSize !== null) setFontSize(savedFontSize);
      } catch (e) {
        console.log("Error loading preferences:", e);
      }
    })();
  }, []);

  // Flips dark mode and saves it.
  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("isDarkMode", String(newValue));
  };

  // Flips sound on/off and saves it.
  const toggleSound = async () => {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    await AsyncStorage.setItem("isSoundEnabled", String(newValue));
  };

  // Changes the font size and saves it.
  const changeFontSize = async (newSize) => {
    setFontSize(newSize);
    await AsyncStorage.setItem("fontSize", newSize);
  };

  // Selects the active theme based on the current mode.
  const theme = isDarkMode
    ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...darkTheme.colors } }
    : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...lightTheme.colors } };

  return (
    <AppPreferencesContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        isSoundEnabled,
        toggleSound,
        fontSize,
        fontScale,
        changeFontSize,
        theme,
      }}
    >
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </AppPreferencesContext.Provider>
  );
};

// Custom hook for consuming the context.
export const useAppPreferences = () => {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used inside AppPreferenceProvider");
  }
  return context;
};