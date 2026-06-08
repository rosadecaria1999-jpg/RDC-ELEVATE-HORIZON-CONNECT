import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, RadioButton, Divider, useTheme } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';

const SettingsScreen = () => {
  const {
    isDarkMode, toggleDarkMode,
    soundEnabled, toggleSound,
    fontSize, setFontSize,
  } = useAppPreferences();
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

      <Divider style={styles.divider} />

      {/* Sound Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>Enable Sounds</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>

      <Divider style={styles.divider} />

      {/* Font Size */}
      <Text style={styles.sectionLabel}>Font Size</Text>
      <RadioButton.Group onValueChange={setFontSize} value={fontSize}>
        <RadioButton.Item label="Small" value="small" position="trailing" />
        <RadioButton.Item label="Medium" value="medium" position="trailing" />
        <RadioButton.Item label="Large" value="large" position="trailing" />
      </RadioButton.Group>
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
});