import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {BackHandler} from 'react-native';

type StartScreenProps = {
  navigation: StackNavigationProp<any>;
};

const StartScreen = ({navigation}: StartScreenProps) => {
  const handleStartGame = () => {
    navigation.navigate('Game'); // Przejdź do widoku gry
  };

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.firstView}>
      <Text style={styles.welcomeText}>Welcome to wordle app!</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Rozpocznij grę</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleExitApp}>
          <Text style={styles.buttonText}>Wyjście</Text>
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
    fontFamily: 'Tahoma', // Ustawienie czcionki na Tahoma
    textAlign: 'center', // Wyrównanie tekstu na środku w poziomie
    textAlignVertical: 'center', // Wyrównanie tekstu na środku w pionie
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
    width: 280,
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

//https://www.color-hex.com/color-palette/1012607
