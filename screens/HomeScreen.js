import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Audio } from 'expo-av';

const imageIndex = {
  logo: require('../assets/images/Logo.jpg'),
};

const HomeScreen = () => {
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
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header (title only) */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Elevate Horizon Connect</Text>
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
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeText}>
            Find and register for Community Events
          </Text>
          <Button
            mode="outlined"
            style={styles.welcomeButton}
            textColor="#333"
            onPress={() => {}}
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
  container: { flex: 1, backgroundColor: '#3F88B8' },
  content: { padding: 16 },

  titleBox: {
    backgroundColor: '#7BB0CE',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
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
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 12,
  },
  welcomeTitle: { fontSize: 30, fontWeight: 'bold', marginBottom: 10, color: '#2C3E50' },
  welcomeText: { fontSize: 15, color: '#444', marginBottom: 18 },
  welcomeButton: { alignSelf: 'flex-start', borderColor: '#333', borderRadius: 4 },
});