import React from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Text, Switch, RadioButton, useTheme } from 'react-native-paper';
import { useAppPreferences } from '../components/AppPreferencesContext';

const SettingsScreen = () => {
  const {
    isDarkMode, toggleDarkMode,
    isSoundEnabled, toggleSound,
    fontSize, changeFontSize, fontScale,
  } = useAppPreferences();

  const theme = useTheme();

  // Detect wide screens for responsive layout.
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      // Settings centered with max width on wide screens.
      contentContainerStyle={isWide ? { maxWidth: 600, alignSelf: 'center', width: '100%' } : undefined}
    >
      <Text style={[styles.title, { color: theme.colors.primary, fontSize: 28 * fontScale }]}>
        Settings
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 16 * fontScale }]}>
          Current Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 16 * fontScale }]}>
          Sound: {isSoundEnabled ? 'On' : 'Off'}
        </Text>
        <Switch value={isSoundEnabled} onValueChange={toggleSound} />
      </View>

      <View style={styles.column}>
        <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 16 * fontScale, marginBottom: 8 }]}>
          Font Size
        </Text>
        <RadioButton.Group onValueChange={changeFontSize} value={fontSize}>
          <RadioButton.Item label="Small"  value="small"  labelStyle={{ color: theme.colors.onSurface, fontSize: 16 * fontScale }} />
          <RadioButton.Item label="Medium" value="medium" labelStyle={{ color: theme.colors.onSurface, fontSize: 16 * fontScale }} />
          <RadioButton.Item label="Large"  value="large"  labelStyle={{ color: theme.colors.onSurface, fontSize: 16 * fontScale }} />
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
  column: { paddingVertical: 12 },
  label: { fontWeight: '500' },
});