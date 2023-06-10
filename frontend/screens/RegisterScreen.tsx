import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import axios from 'axios';

type RegisterScreenPops = {
  navigation: StackNavigationProp<any>;
};

const RegisterScreen = ({navigation}: RegisterScreenPops) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegistration() {
    try {
      const data = {
        nickname: nickname,
        password: password,
      };

      const response = await axios.post(
        'http://192.168.0.106:8080/registration',
        data,
      );

      console.log(data);
      console.log(response.data);

      alert('You have successfully registered');
    } catch (error) {
      console.error(error);
    }
  }

  const handleExitApp = () => {
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        onChangeText={text => setNickname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleExitApp}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    fontFamily: 'Tahoma',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 50,
  },
  input: {
    width: 350,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
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
