import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const StatsScreen = () => {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const route = useRoute();
  const {nickname} = route.params;

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.106:8080/user/${nickname}`,
        );

        if (isMounted) {
          const {games, wins} = response.data;
          setGamesPlayed(games || 0);
          setGamesWon(wins || 0);
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching stats');
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [nickname]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Stats</Text>
      <Text style={styles.label}>Games Played:</Text>
      <Text style={styles.value}>{gamesPlayed}</Text>
      <Text style={styles.label}>Games Won:</Text>
      <Text style={styles.value}>{gamesWon}</Text>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
