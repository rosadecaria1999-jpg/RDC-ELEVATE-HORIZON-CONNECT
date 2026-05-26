import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const EventDetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EventDetailsScreen</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('EventRegistration')}
      >
        Register
      </Button>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3de1bb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { marginBottom: 10 },
});