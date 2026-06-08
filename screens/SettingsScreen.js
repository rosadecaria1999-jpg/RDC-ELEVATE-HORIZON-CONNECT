import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useAppPreferences();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Title */}
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Settings
      </Text>

      {/* Theme Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>
          Current Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});