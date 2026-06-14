import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, RadioButton, useTheme } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';

const SettingsScreen = () => {
  // Retrieve all preferences and toggle functions from the context.
  const {
    isDarkMode, toggleDarkMode,
    isSoundEnabled, toggleSound,
    fontSize, changeFontSize, fontScale,
  } = useAppPreferences();

  // Retrieve the active theme for dynamic colours.
  const theme = useTheme();

  return (
    // The background colour stays white-ish in light mode by using surface.
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.surface }]}>

      {/* Screen title */}
      <Text style={[styles.title, { color: theme.colors.primary, fontSize: 28 * fontScale }]}>
        Settings
      </Text>

      {/* Dark / Light mode row */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 16 * fontScale }]}>
          Current Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Sound on / off row */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 16 * fontScale }]}>
          Sound: {isSoundEnabled ? 'On' : 'Off'}
        </Text>
        <Switch value={isSoundEnabled} onValueChange={toggleSound} />
      </View>

      {/* Font size section with radio buttons */}
      <View style={styles.column}>
        <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 16 * fontScale, marginBottom: 8 }]}>
          Font Size
        </Text>
        <RadioButton.Group onValueChange={changeFontSize} value={fontSize}>
          <RadioButton.Item
            label="Small"
            value="small"
            labelStyle={{ color: theme.colors.onSurface, fontSize: 16 * fontScale }}
          />
          <RadioButton.Item
            label="Medium"
            value="medium"
            labelStyle={{ color: theme.colors.onSurface, fontSize: 16 * fontScale }}
          />
          <RadioButton.Item
            label="Large"
            value="large"
            labelStyle={{ color: theme.colors.onSurface, fontSize: 16 * fontScale }}
          />
        </RadioButton.Group>
      </View>

    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontWeight: 'bold', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  column: {
    paddingVertical: 12,
  },
  label: { fontWeight: '500' },
});