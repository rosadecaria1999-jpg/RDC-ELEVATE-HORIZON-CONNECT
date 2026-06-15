import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';
import { getEventById } from '../services/apiService';

const EventDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { event, offline } = route.params;

  // Detect wide screens for responsive layout.
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { loadDetails(); }, []);

  async function loadDetails() {
    if (offline) {
      setEventDetails(event);
      setLoading(false);
      return;
    }
    try {
      const result = await getEventById(event.id);
      if (result.success) setEventDetails(result.event);
      else setError(result.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
        <Text style={{ color: theme.colors.onBackground }}>Loading event...</Text>
      </View>
    );
  }

  if (error || !eventDetails) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.onBackground }}>Error: {error || 'Event not found'}</Text>
      </View>
    );
  }

  const noSpotsLeft = eventDetails.spotsRemaining === 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      // Centered with max width on wide screens.
      contentContainerStyle={isWide ? { maxWidth: 700, alignSelf: 'center', width: '100%' } : undefined}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{eventDetails.title}</Text>

          <Row label="Category"        value={eventDetails.category} theme={theme} />
          <Row label="Date"            value={eventDetails.date} theme={theme} />
          <Row label="Time"            value={`${eventDetails.startTime} - ${eventDetails.endTime}`} theme={theme} />
          <Row label="Location"        value={eventDetails.location} theme={theme} />
          <Row label="Description"     value={eventDetails.description} theme={theme} />
          <Row label="Capacity"        value={eventDetails.capacity} theme={theme} />
          <Row label="Spots Remaining" value={eventDetails.spotsRemaining} theme={theme} />

          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              disabled={noSpotsLeft}
              onPress={() => navigation.navigate('EventRegistration', { event: eventDetails })}
              style={styles.button}
            >
              Register
            </Button>
          </View>
        </Card.Content>
      </Card>

      {noSpotsLeft && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>
            Sorry, no spots are available for this event.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const Row = ({ label, value, theme }) => (
  <View style={[styles.row, { borderBottomColor: theme.colors.outlineVariant }]}>
    <Text style={[styles.label, { color: theme.colors.onSurface }]}>{label}:</Text>
    <Text style={[styles.value, { color: theme.colors.onSurfaceVariant }]}>{value}</Text>
  </View>
);

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1 },
  label: { flex: 1, fontWeight: 'bold' },
  value: { flex: 2 },
  buttonRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  button: { minWidth: 100 },
  errorBanner: { backgroundColor: '#e74c3c', padding: 14, borderRadius: 6, marginTop: 8 },
  errorBannerText: { color: 'white', textAlign: 'center', fontWeight: '500' },
});