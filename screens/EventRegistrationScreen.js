import { View, Text, StyleSheet } from 'react-native';

const EventRegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>EventRegistrationScreen</Text>
    </View>
  );
};

export default EventRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89dda2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});