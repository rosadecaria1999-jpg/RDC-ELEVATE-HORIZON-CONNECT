import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Searchbar, Surface, Button } from 'react-native-paper';
import { getAllEvents } from '../services/apiService';
import { useAppPreferences } from '../components/AppPreferencesContext';

const EventsListScreen = ({ navigation }) => {
  const { theme } = useAppPreferences();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Today', 'Education', 'Fitness', 'Music', 'Community', 'Outdoor', 'Entertainment', 'Technology', 'Food', 'Arts', 'Health', 'Networking'];

  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    let updated = [...events];

    // Filter by category
    if (selectedCategory === 'Today') {
      const today = new Date().toISOString().split('T')[0];
      updated = updated.filter((e) => e.date.startsWith(today));
    } else if (selectedCategory !== 'All') {
      updated = updated.filter((e) => e.category === selectedCategory);
    }

    // Filter by search text
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      updated = updated.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    setFilteredEvents(updated);
  }, [events, selectedCategory, searchQuery]);

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
    <Surface style={{ flex: 1, padding: 12 }} elevation={5}>
      {offline && (
        <View style={{ backgroundColor: 'yellow', padding: 10, marginBottom: 10, borderRadius: 5 }}>
          <Text style={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
            You are currently working offline
          </Text>
        </View>
      )}

      {error && (
        <View style={{ backgroundColor: 'red', padding: 10, marginBottom: 10, borderRadius: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Error: {error}
          </Text>
        </View>
      )}

      <View style={styles.container}>
        {/* Search bar */}
        <Searchbar
          placeholder="Search Events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          inputStyle={{ fontSize: theme?.fonts?.bodyLarge?.fontSize || 15 }}
          iconColor={theme?.colors?.onSurface}
        />

        {/* Category filters */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, gap: 8 }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              compact={true}
              mode={selectedCategory === cat ? 'contained' : 'outlined'}
              onPress={() => setSelectedCategory(cat)}
              style={{ marginRight: 2, marginBottom: 2 }}
              buttonColor={selectedCategory === cat ? theme.colors.primary : theme.colors.surfaceVariant}
              textColor={selectedCategory === cat ? 'white' : theme.colors.onSurfaceVariant}
            >
              {cat}
            </Button>
          ))}
        </View>

        {/* Events list */}
        <FlatList
          data={filteredEvents}
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
    </Surface>
  );
};

export default EventsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F88B8',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginBottom: 12,
    elevation: 0,
  },
  listContent: { paddingBottom: 20 },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
});
