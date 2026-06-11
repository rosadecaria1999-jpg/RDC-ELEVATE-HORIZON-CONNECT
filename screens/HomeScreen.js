import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';
import { Audio } from 'expo-av';

const imageIndex = {
  logo: require('../assets/images/Logo.jpg'),
};

const HomeScreen = () => {
  // Gets the current theme (light or dark) from PaperProvider
  const theme = useTheme();
  

  // ─── Audio playback ───
  const playSound = async () => {
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
      <View style={[styles.titleBox, { backgroundColor: theme.colors.primaryContainer }]}>
        <Text style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
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
          <Text style={[styles.welcomeTitle, { color: theme.colors.onSurface }]}>Welcome</Text>
          <Text style={[styles.welcomeText, { color: theme.colors.onSurfaceVariant }]}>
            Find and register for Community Events
          </Text>
          <Button
            mode="outlined"
            style={styles.welcomeButton}
            onPress={() => { }}
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
    fontSize: 20,
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
  welcomeTitle: { fontSize: 30, fontWeight: 'bold', marginBottom: 10 },
  welcomeText: { fontSize: 15, marginBottom: 18 },
  welcomeButton: { alignSelf: 'flex-start', borderRadius: 4 },
});