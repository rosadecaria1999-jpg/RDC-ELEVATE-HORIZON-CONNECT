import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { getAllEvents } from '../services/apiService';

const CATEGORIES = [ 'All Events' ,'Today','Athletics', 'Fitness', 'Music', 'Social', 'Outdoors', 'Family'];

const EventsListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    const result = await getAllEvents();
    if (result.success) {
      setEvents(result.events);
      setOffline(result.offline);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading Events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Offline banner */}
      {offline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>Offline Mode</Text>
        </View>
      )}

      {/* Search bar */}
      <Searchbar
        placeholder="Search Events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
      />

      {/* Category chips */}
      <View style={styles.chipsContainer}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Chip
              key={cat}
              selected={isSelected}
              onPress={() => setSelectedCategory(cat)}
              showSelectedCheck={false}
              style={[styles.chip, isSelected && styles.chipSelected]}
              textStyle={isSelected ? styles.chipTextSelected : styles.chipText}
            >
              {cat}
            </Chip>
          );
        })}
      </View>

      {/* Events list */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { event: item, offline })}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item?.title}</Text>
              <Text>{item?.date}</Text>
              <Text>{item?.location}</Text>
              <Text>Spots: {item?.spotsRemaining}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EventsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F88B8',   // matches home screen
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  offlineBanner: {
    backgroundColor: '#ffe9a8',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  offlineText: { textAlign: 'center', fontWeight: 'bold' },

  searchbar: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginBottom: 12,
    elevation: 0,
  },
  searchInput: { fontSize: 15 },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: { backgroundColor: 'white' },
  chipSelected: { backgroundColor: '#7BB0CE' },
  chipText: { color: '#333' },
  chipTextSelected: { color: 'white', fontWeight: 'bold' },

  listContent: { paddingBottom: 20 },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
});