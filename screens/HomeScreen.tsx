import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const route = useRoute();
  const {nickname} = route.params;

  const handlePlay = async () => {
    try {
      const response = await axios.post(
        `http://192.168.0.106:8080/game/play/${nickname}`,
      );

      if (response.status === 200) {
        navigation.navigate('Game', {nickname: nickname});
      } else {
        alert('An error occurred');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while playing the game');
    }
  };

  const handleStats = () => {
    navigation.navigate('Stats', {nickname: nickname});
  };

  const handleStart = () => {
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hi, {nickname} !
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleStats}>
        <Text style={styles.buttonText}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    fontFamily: 'Tahoma',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 50,
  },
  button: {
    marginVertical: 10,
    width: 350,
    paddingVertical: 10,
    backgroundColor: '#6ca965',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
