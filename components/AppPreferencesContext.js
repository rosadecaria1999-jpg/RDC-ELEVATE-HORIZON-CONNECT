import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import lightTheme from "../themes/lightTheme.json";
import darkTheme from "../themes/darkTheme.json";

const AppPreferencesContext = createContext(null);

export const AppPreferenceProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSize, setFontSizeState] = useState("small");   // ← NEW

  useEffect(() => {
    (async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem("isDarkMode");
        const savedSound = await AsyncStorage.getItem("soundEnabled");
        const savedFontSize = await AsyncStorage.getItem("fontSize");  // ← NEW
        if (savedDarkMode !== null) setIsDarkMode(savedDarkMode === "true");
        if (savedSound !== null) setSoundEnabled(savedSound === "true");
        if (savedFontSize !== null) setFontSizeState(savedFontSize);   // ← NEW
      } catch (e) {
        console.log("Error loading preferences:", e);
      }
    })();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("isDarkMode", String(newValue));
  };

  const toggleSound = async () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    await AsyncStorage.setItem("soundEnabled", String(newValue));
  };

  // ← NEW
  const setFontSize = async (size) => {
    setFontSizeState(size);
    await AsyncStorage.setItem("fontSize", size);
  };

  const theme = isDarkMode
    ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...darkTheme.colors } }
    : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...lightTheme.colors } };

  return (
    <AppPreferencesContext.Provider
      value={{
        isDarkMode, toggleDarkMode,
        soundEnabled, toggleSound,
        fontSize, setFontSize,     // ← NEW
        theme,
      }}
    >
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </AppPreferencesContext.Provider>
  );
};

export const useAppPreferences = () => {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used inside AppPreferenceProvider");
  }
  return context;
};
