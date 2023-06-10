import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {BackHandler} from 'react-native';

type StartScreenProps = {
  navigation: StackNavigationProp<any>;
};

const StartScreen = ({navigation}: StartScreenProps) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.firstView}>
      <Text style={styles.welcomeText}>Welcome to wordle app!</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleExitApp}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    fontFamily: 'Tahoma',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  firstView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  buttonsContainer: {flexDirection: 'column', margin: 100},
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
