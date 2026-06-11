import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';

const SettingsScreen = () => {
  // Retrieves the current theme state and toggle function from the context.
  const { isDarkMode, toggleDarkMode } = useAppPreferences();

  // Retrieves the active theme object for applying dynamic colours.
  const theme = useTheme();

  return (
    // The background colour dynamically updates based on the active theme.
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      
      {/* Screen title uses the theme's primary colour for visual consistency. */}
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Settings
      </Text>

      {/* Row containing the label and the toggle switch. */}
      <View style={styles.row}>
        <Text style={styles.label}>
          Current Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>

        {/* The Switch reflects the current state and triggers the toggle on change. */}
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: { fontSize: 16, fontWeight: '500' },
});
