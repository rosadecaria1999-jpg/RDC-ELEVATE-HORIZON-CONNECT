import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import react from 'react';
import { useState, useEffect } from 'react';
import { getAllEvents } from '../services/apiService';




const EventsListScreen = (props) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState([]);

  useEffect(() => {
    console.log("Hello useEffect")
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    const result = await getAllEvents();
    if (result.success) {
      setEvents(result.events);
      setOffline(result.offline);
      console.log(events);
    }
    else {
      setError(result.error)
    }
    setLoading(false);
  }

  if (loading) {
      return(
        <View style = {{ flex:1, justifyContent:'center', alignContent: 'center'}}>
          <ActivityIndicator size = "large"/>
          <Text>
            Loading Events...
          </Text>
        </View>
      )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>EventsListScreen</Text>
      <Button
        mode="contained"
        icon="arrow-right"
        onPress={() => navigation.navigate('EventDetails')}
      >
        Press me
      </Button>
      {offline && (
        <View>
          <Text style={{ textAlign: 'center' }}>
              Text Offline Mode
          </Text>
        </View>
      )}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style ={styles.card}>
            <Text style ={styles.title}>
              {item?.title} 
            </Text>
            <Text>
              {item?.date}
            </Text>
            <Text>
              {item?.location}
            </Text>
            <Text>
              {item?.spotRemaining}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default EventsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#b7b5b5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { 
    marginBottom: 10 
  },
  title :{
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    marginBottom:12,
    borderWidth:1,
    borderColor: "#474545",
    borderRadius: 8,
    backgroundColor:"#eee"



  }
});