import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Banner, Surface } from "react-native-paper";
import { registerForEvent } from "../services/apiService";

export default function EventRegistrationScreen({ route, navigation }) {
  const { event } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    // Validation
    if (!name || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await registerForEvent(event.id, name, email);

      if (result.success) {
        setSuccess(true);
        event.spotsRemaining -= 1; // update locally so list reflects it
        // Navigate back to Events List after 1.5 seconds
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "EventsList" }],
          });
        }, 1500);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (e) {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const noSpotsLeft = event.spotsRemaining <= 0;

  return (
    <Surface style={styles.surface} elevation={5}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text variant="headlineMedium" style={styles.title}>
          Register for: {event.title}
        </Text>

        {/* Available spots */}
        <Text style={styles.spots}>
          Available Spots: {event.spotsRemaining}
        </Text>

        {/* No spots banner */}
        {noSpotsLeft && (
          <Banner visible style={styles.noSpotsBanner}>
            Sorry, no spots are available for this event.
          </Banner>
        )}

        {/* Input fields */}
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          disabled={noSpotsLeft}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          disabled={noSpotsLeft}
          keyboardType="email-address"
        />

        {/* Error message */}
        {error && <Text style={styles.error}>{error}</Text>}

        {/* Success message */}
        {success && (
          <Text style={styles.success}>Registration successful!</Text>
        )}

        {/* Loading spinner */}
        {loading && (
          <ActivityIndicator size="large" style={{ marginVertical: 12 }} />
        )}

        {/* Action buttons */}
        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleRegister}
            disabled={noSpotsLeft || loading}
          >
            Register
          </Button>
        </View>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  spots: {
    marginBottom: 8,
    fontSize: 16,
  },
  noSpotsBanner: {
    marginVertical: 10,
    backgroundColor: "#ffcc00",
    borderRadius: 10,
  },
  input: {
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  success: {
    color: "green",
    marginBottom: 12,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});