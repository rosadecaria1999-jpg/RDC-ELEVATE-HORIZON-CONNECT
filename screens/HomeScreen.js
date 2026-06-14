import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';
import { Audio } from 'expo-av';
import { useAppPreferences } from '../components/AppPreferencesContext';

const imageIndex = {
  logo: require('../assets/images/Logo.jpg'),
};

// Receives onViewEvents callback from MainNavigator.
const HomeScreen = ({ onViewEvents }) => {
  // Gets the current theme (light or dark) from PaperProvider
  const theme = useTheme();

  // Read sound and font scale from the context.
  const { isSoundEnabled, fontScale } = useAppPreferences();

  // ─── Audio playback ───
  const playSound = async () => {
    // If sound is disabled in Settings, do nothing.
    if (!isSoundEnabled) return;

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/sound.mp3')
      );
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Header (title only) */}
      <View style={[styles.titleBox, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.title, { color: theme.colors.onPrimary, fontSize: 20 * fontScale }]}>
          Elevate Horizon Connect
        </Text>
      </View>

      {/* Logo (tap to play sound) */}
      <TouchableOpacity onPress={playSound} activeOpacity={0.7} style={styles.logoWrapper}>
        <Image
          source={imageIndex.logo}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Welcome card */}
      <Card style={[styles.welcomeCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.welcomeTitle, { color: theme.colors.onSurface, fontSize: 28 * fontScale }]}>
            Welcome
          </Text>
          <Text style={[styles.welcomeText, { color: theme.colors.onSurfaceVariant, fontSize: 15 * fontScale }]}>
            Find and register for Community Events
          </Text>

          {/* Shows today's events in the Events tab. */}
          <Button
            mode="outlined"
            style={styles.welcomeButton}
            onPress={onViewEvents}
          >
            View Today's Events
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },

  titleBox: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },

  welcomeCard: {
    marginBottom: 20,
    borderRadius: 12,
  },
  welcomeTitle: { fontWeight: 'bold', marginBottom: 10 },
  welcomeText: { marginBottom: 18 },
  welcomeButton: { alignSelf: 'flex-start', borderRadius: 4 },
});