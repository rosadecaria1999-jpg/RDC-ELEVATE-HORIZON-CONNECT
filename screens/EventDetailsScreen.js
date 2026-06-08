import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { getEventById } from '../services/apiService';

const EventDetailsScreen = ({ route, navigation }) => {
  const { event, offline } = route.params;

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    // If offline, just use the event passed from the list
    if (offline) {
      setEventDetails(event);
      setLoading(false);
      return;
    }

    // Otherwise, fetch fresh data from the API
    try {
      const result = await getEventById(event.id);
      if (result.success) {
        setEventDetails(result.event);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading event...</Text>
      </View>
    );
  }

  if (error || !eventDetails) {
    return (
      <View style={styles.center}>
        <Text>Error: {error || 'Event not found'}</Text>
      </View>
    );
  }

  const noSpotsLeft = eventDetails.spotsRemaining === 0;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{eventDetails.title}</Text>

          <Row label="Category"        value={eventDetails.category} />
          <Row label="Date"            value={eventDetails.date} />
          <Row label="Time"            value={`${eventDetails.startTime} - ${eventDetails.endTime}`} />
          <Row label="Location"        value={eventDetails.location} />
          <Row label="Description"     value={eventDetails.description} />
          <Row label="Capacity"        value={eventDetails.capacity} />
          <Row label="Spots Remaining" value={eventDetails.spotsRemaining} />

          <View style={styles.buttonRow}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              Back
            </Button>
            <Button
              mode="contained"
              disabled={noSpotsLeft}
              onPress={() =>
                navigation.navigate('EventRegistration', { event: eventDetails })
              }
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

// Small helper component for each row in the card
const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 2,
    color: '#444',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    minWidth: 100,
  },
  errorBanner: {
    backgroundColor: '#e74c3c',
    padding: 14,
    borderRadius: 6,
    marginTop: 8,
  },
  errorBannerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});