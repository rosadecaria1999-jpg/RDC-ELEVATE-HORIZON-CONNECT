	import React from 'react';
	import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
	import { Card, Button, useTheme } from 'react-native-paper';
	import { Audio } from 'expo-av';
	import { useAppPreferences } from '../components/AppPreferencesContext';
	
	const imageIndex = {
	  logo: require('../assets/images/Logo.jpg'),
	};
	
	const HomeScreen = ({ onViewEvents }) => {
	  const theme = useTheme();
	  const { isSoundEnabled, fontScale } = useAppPreferences();
	
	  const { width } = useWindowDimensions();
	  const isWide = width >= 600;
	
	  const playSound = async () => {
	    if (!isSoundEnabled) return;
	    try {
	      const { sound } = await Audio.Sound.createAsync(
	        require('../assets/audio/sound.mp3')
	      );
	      await sound.playAsync();
	      sound.setOnPlaybackStatusUpdate((status) => {
	        if (status.didJustFinish) sound.unloadAsync();
	      });
	    } catch (error) {
	      console.log('Error playing sound:', error);
	    }
	  };
	
	  return (
	    <ScrollView
	      style={[styles.container, { backgroundColor: theme.colors.background }]}
	      contentContainerStyle={[
	        styles.content,
	        isWide && { maxWidth: 700, alignSelf: 'center', width: '100%' },
	      ]}
	    >
	      <View style={[styles.titleBox, { backgroundColor: theme.colors.primary }]}>
	        <Text style={[styles.title, { color: theme.colors.onPrimary, fontSize: 20 * fontScale }]}>
	          Elevate Horizon Connect
	        </Text>
	      </View>
	
	      <TouchableOpacity onPress={playSound} activeOpacity={0.7} style={styles.logoWrapper}>
	        <Image
	          source={imageIndex.logo}
	          resizeMode="contain"
	          style={[styles.logo, isWide && { width: 280, height: 140 }]}
	        />
	      </TouchableOpacity>
	
	      {/* Welcome card centred horizontally with all content centred inside. */}
	      <Card style={[styles.welcomeCard, { backgroundColor: theme.colors.surface }]}>
	        <Card.Content style={styles.cardContentCentered}>
	          <Text style={[styles.welcomeTitle, { color: theme.colors.onSurface, fontSize: 28 * fontScale, textAlign: 'center' }]}>
	            Welcome
	          </Text>
	          <Text style={[styles.welcomeText, { color: theme.colors.onSurfaceVariant, fontSize: 15 * fontScale, textAlign: 'center' }]}>
	            Find and register for Community Events
	          </Text>
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
	
	  logoWrapper: { alignItems: 'center', marginBottom: 20 },
	  logo: { width: 200, height: 100 },
	
	  welcomeCard: {
	    marginBottom: 20,
	    borderRadius: 12,
	    alignSelf: 'center',
	    width: '100%',
	    maxWidth: 500,
	  },
	
	  // Card.Content centres its children both horizontally and vertically.
	  cardContentCentered: {
	    alignItems: 'center',
	  },
	
	  welcomeTitle: {
	    fontWeight: 'bold',
	    marginBottom: 10,
	    textAlign: 'center',
	  },
	  welcomeText: {
	    marginBottom: 18,
	    textAlign: 'center',
	  },
	  welcomeButton: {
	    alignSelf: 'center',
	    borderRadius: 4,
	  },
	});
